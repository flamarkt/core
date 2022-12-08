<?php

namespace Flamarkt\Core\Order\Event;

use Flamarkt\Core\Order\Order;
use Flarum\User\User;

class Saving
{
    public function __construct(
        public Order $order,
        public User  $actor,
        public array $data = []
    )
    {
    }
}
