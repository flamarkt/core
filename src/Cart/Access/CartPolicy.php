<?php

namespace Flamarkt\Core\Cart\Access;

use Flamarkt\Core\Cart\Cart;
use Flamarkt\Core\Cart\CartLock;
use Flamarkt\Core\Cart\GuestCart;
use Flarum\User\Access\AbstractPolicy;
use Flarum\User\User;

class CartPolicy extends AbstractPolicy
{
    public function addProducts(User $actor, Cart $cart)
    {
        if ($cart instanceof GuestCart) {
            return $this->deny();
        }

        if (resolve(CartLock::class)->isContentLocked($cart)) {
            return $this->deny();
        }

        if ($actor->hasPermission('backoffice')) {
            return $this->allow();
        }

        // TODO: match guest cart with correct guest session
        return $actor->id === $cart->user_id && $actor->hasPermission('flamarkt.cart');
    }

    public function checkout(User $actor, Cart $cart)
    {
        if ($cart instanceof GuestCart) {
            return $this->deny();
        }

        if ($actor->hasPermission('backoffice')) {
            return $this->allow();
        }

        // TODO: match guest cart with correct guest session
        return $actor->id === $cart->user_id && $actor->hasPermission('flamarkt.checkout');
    }
}
