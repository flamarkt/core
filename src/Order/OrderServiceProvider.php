<?php

namespace Flamarkt\Core\Order;

use Flarum\Foundation\AbstractServiceProvider;

class OrderServiceProvider extends AbstractServiceProvider
{
    public function register()
    {
        $this->container->instance('flamarkt.order.groups', [
            'products',
            'shipping',
        ]);
    }
}
