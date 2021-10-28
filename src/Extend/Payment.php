<?php

namespace Flamarkt\Core\Extend;

use Flarum\Extend\ExtenderInterface;
use Flarum\Extension\Extension;
use Flarum\Foundation\ContainerUtil;
use Illuminate\Contracts\Container\Container;

class Payment implements ExtenderInterface
{
    private $partialCallbacks = [];
    private $remainingCallbacks = [];

    /**
     * Register a payment callback that should execute before full payment options.
     * This is intended for methods that might not always cover the full amount of the order and will be combined with another method for the remaining funds.
     *
     * @param callable|string $callback
     *
     * The callback can be a closure or invokable class, and should accept:
     * - OrderBuilder $builder
     * - Order $order
     * - User $actor
     * - Cart $cart
     * - array $data
     *
     * @return self
     */
    public function partialCallback($callback): self
    {
        $this->partialCallbacks [] = $callback;

        return $this;
    }

    /**
     * Register a payment callback that should execute after partial payment options.
     * This is intended for methods that will cover the full remaining unpaid amount.
     *
     * @param callable|string $callback
     *
     * The callback can be a closure or invokable class, and should accept:
     * - OrderBuilder $builder
     * - Order $order
     * - User $actor
     * - Cart $cart
     * - array $data
     *
     * @return self
     */
    public function remainingCallback($callback): self
    {
        $this->partialCallbacks [] = $callback;

        return $this;
    }

    public function extend(Container $container, Extension $extension = null)
    {
        $container->extend('flamarkt.payment.callbacks', function ($callbacks) use ($container) {
            $callbacks['partial'] = array_merge($callbacks['partial'], array_map(function ($callback) use ($container) {
                return ContainerUtil::wrapCallback($callback, $container);
            }, $this->partialCallbacks));
            $callbacks['remaining'] = array_merge($callbacks['remaining'], array_map(function ($callback) use ($container) {
                return ContainerUtil::wrapCallback($callback, $container);
            }, $this->remainingCallbacks));

            return $callbacks;
        });
    }
}
