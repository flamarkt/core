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

    public function isLocked(Cart $cart): bool
    {
        return $this->cache->has($cart->uid . '-lock');
    }

    public function lock(Cart $cart): void
    {
        // The lock lifetime is to prevent submitting the cart again too soon if Flamarkt
        // experienced an unrecoverable error during processing and wasn't able to clear the lock at the end
        // There likely isn't any queued task at this point, so it's just to let any error handler finish its job
        $this->cache->set($cart->uid . '-lock', Carbon::now(), 120); // 2 minutes
    }

    public function unlock(Cart $cart): void
    {
        $this->cache->forget($cart->uid . '-lock');
    }
}
