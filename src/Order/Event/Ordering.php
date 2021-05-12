<?php

namespace Flamarkt\Core\Order\Event;

use Flamarkt\Core\Cart\Cart;
use Flamarkt\Core\Order\OrderBuilder;
use Flarum\User\User;

class Ordering
{
    public $builder;
    public $actor;
    public $cart;
    public $data;

    public function __construct(OrderBuilder $builder, User $actor, Cart $cart, array $data = [])
    {
        $this->builder = $builder;
        $this->actor = $actor;
        $this->cart = $cart;
        $this->data = $data;
    }
}
