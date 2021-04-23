<?php

namespace Flamarkt\Core\Order\Event;

use Flamarkt\Core\Order\Order;
use Flamarkt\Core\Order\OrderLine;
use Flarum\User\User;

class SavingLine
{
    public $order;
    public $line;
    public $actor;
    public $data;

    public function __construct(Order $order, OrderLine $line, User $actor, array $data = [])
    {
        $this->order = $order;
        $this->line = $line;
        $this->actor = $actor;
        $this->data = $data;
    }
}
