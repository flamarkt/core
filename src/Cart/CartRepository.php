<?php

namespace Flamarkt\Core\Cart;

use Flamarkt\Core\Cart\Event\Created;
use Flamarkt\Core\Cart\Event\Saving;
use Flamarkt\Core\Cart\Event\WillOrder;
use Flarum\Foundation\DispatchEventsTrait;
use Flarum\Foundation\ValidationException;
use Flarum\User\User;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Database\Eloquent\Builder;

class CartRepository
{
    use DispatchEventsTrait;

    public function __construct(
        Dispatcher         $events,
        protected CartLock $lock
    )
    {
        $this->events = $events;
    }

    public function query(): Builder
    {
        return Cart::query();
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
    public function findId($id, User $actor = null): ?Cart
    {
        return $this->visibleTo($actor)->find($id);
    }

    public function findUid(string $uid = null, User $actor = null): ?Cart
    {
        return $this->visibleTo($actor)->where('uid', $uid)->first();
    }

    /**
     * @internal Kept just in case, but should be avoided
     */
    public function findIdOrFail($id, User $actor = null): Cart
    {
        return $this->visibleTo($actor)->findOrFail($id);
    }

    public function findUidOrFail(string $uid = null, User $actor = null): Cart
    {
        return $this->visibleTo($actor)->where('uid', $uid)->firstOrFail();
    }

    public function save(Cart $cart, User $actor, array $data): Cart
    {
        $this->events->dispatch(new Saving($cart, $actor, $data));

        if (!$cart->exists) {
            $cart->raise(new Created($cart));
        }

        $cart->save();

        // So event listeners can retrieve the new values
        $cart->unsetRelation('products');

        $cart->updateMeta();

        $this->dispatchEventsFor($cart, $actor);

        return $cart;
    }

    public function store(User $actor): Cart
    {
        $cart = new Cart();
        $cart->user_id = $actor->id;

        return $this->save($cart, $actor, []);
    }

    public function update(Cart $cart, User $actor, array $data): Cart
    {
        return $this->save($cart, $actor, $data);
    }

    /**
     * To be used by payment drivers before they attempt to capture funds or perform a redirect.
     * Will throw a validation exception if a different process already has a lock on the cart.
     * No validation exception is thrown if the same origin already has a valid lock.
     * @param User $actor
     * @param Cart $cart
     * @param string $origin
     * @return void
     * @throws ValidationException
     * @throws \Flarum\User\Exception\PermissionDeniedException
     */
    public function validateAndLockContent(User $actor, Cart $cart, string $origin): void
    {
        $actor->assertCan('checkout', $cart);

        if ($this->lock->isContentLockedExceptBy($cart, $origin)) {
            throw new ValidationException([
                'lock' => 'Cart is already locked by another process',
            ]);
        }

        // Lock first to prevent most race conditions since we don't know how fast or slow extensions will process the event
        $this->lock->lockContent($cart, $origin);

        try {
            $this->events->dispatch(new WillOrder($cart, $actor));
        } catch (\Exception $exception) {
            // If there was an error, don't proceed with the lock
            $this->lock->unlockContent($cart);

            throw $exception;
        }
    }
}
