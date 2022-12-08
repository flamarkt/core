<?php

namespace Flamarkt\Core\Order\Event;

use Flamarkt\Core\Cart\Cart;
use Flamarkt\Core\Order\Order;
use Flamarkt\Core\Order\OrderBuilder;
use Flarum\User\User;

class Ordering
{
    public function __construct(
        public OrderBuilder $builder,
        public Order        $order,
        public User         $actor,
        public Cart         $cart,
        public array        $data = []
    )
    {
    }
}
