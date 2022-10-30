<?php

namespace Flamarkt\Core\Order\Event;

use Flamarkt\Core\Order\Order;
use Flarum\User\User;

class Deleting
{
    public $order;
    public $actor;
    public $data;

    public function __construct(Order $order, User $actor, array $data = [])
    {
        $this->order = $order;
        $this->actor = $actor;
        $this->data = $data;
    }
}
