<?php

namespace Flamarkt\Core\Product;

use Flamarkt\Core\Cart\Cart;
use Flamarkt\Core\Product\Event\Deleted;
use Flamarkt\Core\Product\Event\Deleting;
use Flamarkt\Core\Product\Event\Saving;
use Flarum\Foundation\DispatchEventsTrait;
use Flarum\User\Exception\PermissionDeniedException;
use Flarum\User\User;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Arr;

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

    public function findOrFail($id, User $actor = null): Product
    {
        return $this->visibleTo($actor)->findOrFail($id);
    }

    public function save(Product $product, User $actor, array $data, Cart $cart = null): Product
    {
        $attributes = Arr::get($data, 'data.attributes');

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
            $quantity = (int)Arr::get($attributes, 'cartQuantity');

            $state = $product->stateForCart($cart);

            if ($quantity > 0) {
                // TODO: pass request
                // TODO: use clean copy of product
                if (!$this->availability->canOrder($product, $actor, null)) {
                    throw new PermissionDeniedException;
                }

                //TODO: validation
                $state->quantity = $quantity;
                $state->save();
            } else if ($state->exists) {
                // No permission check when removing from cart
                $state->delete();
            }

            $cart->updateMeta();
        }

        $this->events->dispatch(new Saving($product, $actor, $data));

        $product->save();

        $this->dispatchEventsFor($product, $actor);

        return $product;
    }

    public function store(User $actor, array $data): Product
    {
        $actor->assertCan('create', Product::class);

        return $this->save(new Product(), $actor, $data);
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
