<?php

namespace Flamarkt\Core\Order\Event;

use Flamarkt\Core\Cart\Cart;
use Flamarkt\Core\Order\Order;
use Flamarkt\Core\Order\OrderBuilder;
use Flarum\User\User;

class Paying
{
    public $builder;
    public $order;
    public $actor;
    public $cart;
    public $data;

    public function __construct(OrderBuilder $builder, Order $order, User $actor, Cart $cart, array $data = [])
    {
        $this->builder = $builder;
        $this->order = $order;
        $this->actor = $actor;
        $this->cart = $cart;
        $this->data = $data;
    }
}
