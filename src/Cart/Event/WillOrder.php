<?php

namespace Flamarkt\Core\Cart\Event;

use Flamarkt\Core\Cart\Cart;
use Flarum\User\User;

/**
 * This event signals that the user is ready to order and should be used to throw any validation exception
 * that would prevent submitting the cart.
 * The event is triggered in 2 places:
 * - At the very beginning of the order processing, but before the database transaction is started.
 * - By extensions before they start their external payment flows.
 * Validation error attribute keys/paths should be formatted according to the POST /orders endpoint even if
 * extensions will also use this event in other endpoint. The error handling will be combined in the frontend.
 */
class WillOrder
{
    public function __construct(
        public Cart $cart,
        public User $actor
    )
    {
    }
}
