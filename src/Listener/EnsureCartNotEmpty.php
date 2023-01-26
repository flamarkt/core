<?php

namespace Flamarkt\Core\Listener;

use Flamarkt\Core\Cart\Event\WillOrder;
use Flarum\Foundation\ValidationException;

class EnsureCartNotEmpty
{
    public function handle(WillOrder $event): void
    {
        if ($event->cart->products->isEmpty()) {
            throw new ValidationException([
                'products' => 'Cart is empty',
            ]);
        }
    }
}
