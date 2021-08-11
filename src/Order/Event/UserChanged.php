<?php

namespace Flamarkt\Core\Order\Event;

use Flamarkt\Core\Order\Order;
use Flarum\User\User;

class UserChanged
{
    public $order;
    public $actor;
    public $oldUser;

    public function __construct(Order $order, User $oldUser = null, User $actor = null)
    {
        $this->order = $order;
        $this->actor = $actor;
        $this->oldUser = $oldUser;
    }
}
