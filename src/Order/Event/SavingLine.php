<?php

namespace Flamarkt\Core\Order\Event;

use Flamarkt\Core\Order\Order;
use Flamarkt\Core\Order\OrderLine;
use Flarum\User\User;

class SavingLine
{
    public function __construct(
        public Order     $order,
        public OrderLine $line,
        public User      $actor,
        public array     $data = []
    )
    {
    }
}
