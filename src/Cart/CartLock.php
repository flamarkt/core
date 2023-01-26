<?php

namespace Flamarkt\Core\Cart;

use Carbon\Carbon;
use Illuminate\Contracts\Cache\Repository;

/**
 * Prevents modification or submission of the cart while a submission is already in process
 * This is used in addition to the order_id flag on the cart model because there's opportunity for a race condition
 * while extensions and payment methods validate the user input but before the order is finished
 * or just while we loop through the pivot tables
 */
class CartLock
{
    public function __construct(
        protected Repository $cache
    )
    {
    }

    public function getContentLockOrigin(Cart $cart): ?string
    {
        if ($this->isSubmitLocked($cart)) {
            return 'SUBMIT';
        }

        // Lock expiration is taken care of by the cache driver
        $origin = $this->cache->get($cart->uid . '-content-lock');

        // No need for a special NULL check since NULL will never be stored in this cache value (`default` is used)
        if ($origin) {
            return $origin;
        }

        return null;
    }

    public function isContentLocked(Cart $cart): bool
    {
        return $this->getContentLockOrigin($cart) !== null;
    }

    public function isContentLockedExceptBy(Cart $cart, string $exceptOrigin): bool
    {
        $origin = $this->getContentLockOrigin($cart);

        return $origin === 'SUBMIT' || ($origin && $origin !== $exceptOrigin);
    }

    public function isContentLockedBy(Cart $cart, string $origin): bool
    {
        return $this->getContentLockOrigin($cart) === $origin;
    }

    public function isSubmitLocked(Cart $cart): bool
    {
        // Lock expiration is taken care of by the cache driver
        return $this->cache->has($cart->uid . '-submit-lock');
    }

    public function lockContent(Cart $cart, string $origin = 'default'): void
    {
        // The lock lifetime is to prevent submitting the cart again too soon if Flamarkt
        // experienced an unrecoverable error during processing and wasn't able to clear the lock at the end
        // There likely isn't any queued task at this point, so it's just to let any error handler finish its job
        $this->cache->set($cart->uid . '-content-lock', $origin, 120); // 2 minutes
    }

    public function lockSubmit(Cart $cart): void
    {
        // The lock lifetime is to prevent submitting the cart again too soon if Flamarkt
        // experienced an unrecoverable error during processing and wasn't able to clear the lock at the end
        // There likely isn't any queued task at this point, so it's just to let any error handler finish its job
        $this->cache->set($cart->uid . '-submit-lock', 'default', 120); // 2 minutes
    }

    public function unlockContent(Cart $cart): void
    {
        $this->cache->forget($cart->uid . '-content-lock');
    }

    public function unlockSubmit(Cart $cart): void
    {
        $this->unlockContent($cart);
        $this->cache->forget($cart->uid . '-submit-lock');
    }
}
