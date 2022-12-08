<?php

namespace Flamarkt\Core\Order\Event;

use Flamarkt\Core\Order\Order;
use Flarum\User\User;

class Hidden
{
    public function __construct(
        public Order $order,
        public ?User $actor = null
    )
    {
    }
}
