<?php

namespace Flamarkt\Core\Mithril2Html;

use ClarkWinkelmann\Mithril2Html\ComponentInterface;
use Flamarkt\Core\Order\Order;
use Flarum\User\User;

class OrderComponent implements ComponentInterface
{
    protected $order;

    public function __construct(Order $order)
    {
        $this->order = $order;
    }

    public function route(): string
    {
        return 'flamarkt/order-summary';
    }

    public function preload(): ?string
    {
        return '/flamarkt/orders/' . $this->order->id;
    }

    public function actor(): ?User
    {
        return $this->order->user;
    }

    public function selector(): ?string
    {
        return '#content';
    }
}
