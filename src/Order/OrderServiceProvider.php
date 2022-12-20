<?php

namespace Flamarkt\Core\Order;

use Flarum\Foundation\AbstractServiceProvider;
use Illuminate\Support\Arr;

class OrderServiceProvider extends AbstractServiceProvider
{
    public function register()
    {
        $this->container->instance('flamarkt.order.line.groups', [
            'shipping',
        ]);

        $this->container->instance('flamarkt.order.line.types', [
            'product',
            'manual',
        ]);

        $this->container->instance('flamarkt.payment.callbacks', [
            'partial' => [],
            'remaining' => [],
        ]);

        $this->container->when(OrderBuilderFactory::class)
            ->needs('$paymentCallbacks')
            ->give(function () {
                $callbacks = $this->container->make('flamarkt.payment.callbacks');

                return array_merge(Arr::get($callbacks, 'partial'), Arr::get($callbacks, 'remaining'));
            });
    }
}
