<?php

namespace Flamarkt\Core\Product;

use Flamarkt\Core\Cart\Cart;
use Flamarkt\Core\Cart\CartLock;
use Flamarkt\Core\Cart\Event\ProductQuantityUpdated;
use Flamarkt\Core\Cart\Event\UpdatingProductQuantity;
use Flamarkt\Core\Product\Event;
use Flarum\Foundation\DispatchEventsTrait;
use Flarum\Foundation\ValidationException;
use Flarum\User\Exception\PermissionDeniedException;
use Flarum\User\User;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Arr;

class ProductRepository
{
    use DispatchEventsTrait;

    public function __construct(
        Dispatcher                    $events,
        protected ProductValidator    $validator,
        protected AvailabilityManager $availability,
        protected CartLock            $lock
    )
    {
        $this->events = $events;
    }

    public function query(): Builder
    {
        return Product::query();
    }

    public function visibleTo(User $actor = null, string $ability = 'view'): Builder
    {
        $query = $this->query();

        if ($actor) {
            return $query->whereVisibleTo($actor, $ability);
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

    public function save(Product $product, User $actor, array $data, Cart $cart = null)
    {
        $attributes = (array)Arr::get($data, 'attributes');
        $includeCartInRelationships = false;

        if ($product->exists) {
            $this->validator->setProduct($product);
        }

        $this->validator->assertValid($attributes);

        if (Arr::exists($attributes, 'title')) {
            $actor->assertCan('edit', $product);

            $oldTitle = $product->title;
            $newTitle = Arr::get($attributes, 'title');

            if ($newTitle !== $oldTitle) {
                $product->title = $newTitle;

                if ($product->exists) {
                    $product->raise(new Event\Renamed($product, $oldTitle));
                }
            }
        }

        if (Arr::exists($attributes, 'description')) {
            $actor->assertCan('edit', $product);

            $newDescription = Arr::get($attributes, 'description') ?: null;

            if ($newDescription !== $product->description) {
                $oldParsedDescription = $product->parsed_description;
                $product->description = $newDescription;

                if ($product->exists) {
                    $product->raise(new Event\DescriptionChanged($product, $oldParsedDescription));
                }
            }
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
            if ($this->lock->isContentLocked($cart)) {
                throw new ValidationException([
                    'cartQuantity' => 'Cannot update quantity while cart is being processed. Try again in a few minutes.',
                ]);
            }

            $actor->assertCan('addProducts', $cart);

            $quantity = max((int)Arr::get($attributes, 'cartQuantity'), 0);

            $state = $product->stateForCart($cart);

            $previousQuantity = (int)$state->quantity;

            if ($quantity !== $previousQuantity) {
                // TODO: pass request
                // TODO: use clean copy of product without attributes in process of being edited
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

                $includeCartInRelationships = true;
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

        $this->events->dispatch(new Event\Saving($product, $actor, $data));

        if (!$product->exists) {
            $product->raise(new Event\Created($product));
        }

        $product->save();

        $this->dispatchEventsFor($product, $actor);

        // To be returned by the JSON:API payload
        // Ideally we would include it separately from the product model but JSON:API only allows relationships of the main model
        $product->setRelation('cart', $includeCartInRelationships ? $cart : null);

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

    public function delete(Product $product, User $actor, array $data = []): void
    {
        $actor->assertCan('delete', $product);

        $this->events->dispatch(new Event\Deleting($product, $actor, $data));

        $product->delete();

        $this->events->dispatch(new Event\Deleted($product, $actor));
    }
}
