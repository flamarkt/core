<?php

namespace Flamarkt\Core\Cart\Event;

use Flamarkt\Core\Cart\Cart;
use Flarum\User\User;

class Saving
{
    public function __construct(
        public Cart  $cart,
        public User  $actor,
        public array $data = []
    )
    {
    }
}
