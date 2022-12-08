<?php

namespace Flamarkt\Core\Order\Event;

use Flamarkt\Core\Order\Order;
use Flarum\User\User;

class UserChanged
{
    public function __construct(
        public Order $order,
        public ?User $oldUser = null,
        public ?User $actor = null
    )
    {
    }
}
