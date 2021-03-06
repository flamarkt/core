<?php

namespace Flamarkt\Core\Product;

use Flamarkt\Core\Cart\Cart;
use Flamarkt\Core\Cart\Event\ProductQuantityUpdated;
use Flamarkt\Core\Cart\Event\UpdatingProductQuantity;
use Flamarkt\Core\Product\Event\Deleted;
use Flamarkt\Core\Product\Event\Deleting;
use Flamarkt\Core\Product\Event\Saving;
use Flarum\Foundation\DispatchEventsTrait;
use Flarum\User\Exception\PermissionDeniedException;
use Flarum\User\User;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Arr;
use Ramsey\Uuid\Uuid;

class ProductRepository
{
    use DispatchEventsTrait;

    protected $validator;
    protected $availability;

    public function __construct(Dispatcher $events, ProductValidator $validator, AvailabilityManager $availability)
    {
        $this->events = $events;
        $this->validator = $validator;
        $this->availability = $availability;
    }

    public function query(): Builder
    {
        return Product::query();
    }

    public function visibleTo(User $actor = null): Builder
    {
        $query = $this->query();

        if ($actor) {
            return $query->whereVisibleTo($actor);
        }

        return $query;
    }

    /**
     * @internal Kept just in case, but should be avoided
     */
    public function findIdOrFail($id, User $actor = null): Product
    {
        return $this->visibleTo($actor)->findOrFail($id);
    }

    public function findUidOrFail(string $uid = null, User $actor = null): Product
    {
        return $this->visibleTo($actor)->where('uid', $uid)->firstOrFail();
    }

    public function save(Product $product, User $actor, array $data, Cart $cart = null): Product
    {
        $attributes = (array)Arr::get($data, 'data.attributes');

        if ($product->exists) {
            $this->validator->setProduct($product);
        }

        $this->validator->assertValid($attributes);

        if (Arr::exists($attributes, 'title')) {
            $actor->assertCan('edit', $product);

            $product->title = Arr::get($attributes, 'title');
        }

        if (Arr::exists($attributes, 'description')) {
            $actor->assertCan('edit', $product);

            $product->description = Arr::get($attributes, 'description');
        }

        if (Arr::exists($attributes, 'price')) {
            $actor->assertCan('edit', $product);

            $product->price = Arr::get($attributes, 'price');
        }

        if (Arr::exists($attributes, 'availabilityDriver')) {
            $actor->assertCan('edit', $product);

            //TODO: validation
            $product->availability_driver = Arr::get($attributes, 'availabilityDriver');
        }

        if (Arr::exists($attributes, 'priceDriver')) {
            $actor->assertCan('edit', $product);

            //TODO: validation
            $product->price_driver = Arr::get($attributes, 'priceDriver');
        }

        if ($cart && Arr::exists($attributes, 'cartQuantity')) {
            $quantity = max((int)Arr::get($attributes, 'cartQuantity'), 0);

            $state = $product->stateForCart($cart);

            $previousQuantity = (int)$state->quantity;

            if ($quantity !== $previousQuantity) {
                // TODO: pass request
                // TODO: use clean copy of product
                if ($quantity > 0 && !$this->availability->canOrder($product, $actor, null)) {
                    throw new PermissionDeniedException;
                }

                $this->events->dispatch(new UpdatingProductQuantity($cart, $product, $actor, $previousQuantity, $quantity, $data));

                if ($quantity > 0) {
                    //TODO: validation
                    $state->quantity = $quantity;
                    $state->save();
                } else if ($state->exists) {
                    // No permission check when removing from cart
                    $state->delete();
                }

                $this->events->dispatch(new ProductQuantityUpdated($cart, $product, $actor, $previousQuantity, $quantity));

                $cart->updateMeta();
            }
        }

        if (Arr::exists($attributes, 'isHidden')) {
            $actor->assertCan('hide', $product);

            if ($attributes['isHidden']) {
                $product->hide();
            } else {
                $product->restore();
            }
        }

        $this->events->dispatch(new Saving($product, $actor, $data));

        $product->save();

        $this->dispatchEventsFor($product, $actor);

        return $product;
    }

    public function store(User $actor, array $data): Product
    {
        $actor->assertCan('create', Product::class);

        $product = new Product();
        $product->uid = Uuid::uuid4()->toString();

        return $this->save($product, $actor, $data);
    }

    public function update(Product $product, User $actor, array $data, Cart $cart = null): Product
    {
        return $this->save($product, $actor, $data, $cart);
    }

    public function delete(Product $product, User $actor)
    {
        $actor->assertCan('delete', $product);

        $this->events->dispatch(new Deleting($product, $actor));

        $product->delete();

        $this->events->dispatch(new Deleted($product, $actor));
    }
}
