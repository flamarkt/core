<?php

namespace Flamarkt\Core\Order;

use Flamarkt\Core\Cart\Cart;
use Flamarkt\Core\Cart\CartLock;
use Flamarkt\Core\Cart\Event\WillOrder;
use Flamarkt\Core\Order\Event\Created;
use Flamarkt\Core\Order\Event\Ordering;
use Flamarkt\Core\Order\Event\Paying;
use Flamarkt\Core\Order\Event\Saving;
use Flamarkt\Core\Order\Event\SavingLine;
use Flamarkt\Core\Product\AvailabilityManager;
use Flamarkt\Core\Product\PriceManager;
use Flarum\Foundation\ValidationException;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\User\User;
use Illuminate\Contracts\Events\Dispatcher;
use Psr\Http\Message\ServerRequestInterface;

class OrderBuilderFactory
{
    public function __construct(
        protected Dispatcher                  $events,
        protected AvailabilityManager         $availability,
        protected PriceManager                $price,
        protected CartLock                    $lock,
        protected SettingsRepositoryInterface $settings,
        protected array                       $paymentCallbacks
    )
    {
    }

    public function build(User $actor, Cart $cart, array $data, ServerRequestInterface $request = null): Order
    {
        $actor->assertCan('checkout', $cart);

        if ($cart->alreadySubmitted) {
            // If submitting the same order again, act idempotently
            $existingOrder = Order::whereVisibleTo($actor)->find($cart->order_id);

            if ($existingOrder) {
                return $existingOrder;
            }

            // But if the user can't see the order that was already submitted, show an error message
            throw new ValidationException([
                'products' => 'This order has already been successfully submitted',
            ]);
        }

        if ($this->lock->isSubmitLocked($cart)) {
            throw new ValidationException([
                'products' => 'This order is already being processed in a different window.',
            ]);
        }

        $this->lock->lockSubmit($cart);

        try {
            $order = $this->process($actor, $cart, $data, $request);

            $cart->order_id = $order->id;
            $cart->save();
        } finally {
            // Only unlock after the cart has been marked as submitted
            $this->lock->unlockSubmit($cart);
        }

        $order->updateMeta()->save();

        $this->events->dispatch(new Created($order, $actor));

        return $order;
    }

    public function pretend(Cart $cart): OrderBuilder
    {
        return $this->processBuilder($cart->user, $cart->user, $cart, [], null, true);
    }

    protected function processBuilder(User $user, User $actor, Cart $cart, array $data, ServerRequestInterface $request = null, bool $pretend = false): OrderBuilder
    {
        $order = new Order();
        $order->user()->associate($user);

        $builder = new OrderBuilder($order, $actor, $cart, $request, $pretend);

        foreach ($cart->products as $product) {
            if (!$builder->pretend) {
                $actor->assertPermission($this->availability->canOrder($product, $actor));
            }

            $line = $builder->addLine(null, 'product');
            $line->product()->associate($product);
            $line->quantity = $product->pivot->quantity;
            $line->price_unit = $this->price->price($product, $actor, $request);
            $line->updateTotal();
        }

        $this->events->dispatch(new Ordering($builder, $order, $actor, $cart, $data));

        $number = 0;

        foreach ($builder->lines as $group => $lines) {
            foreach ($lines as $line) {
                $line->number = ++$number;

                $this->events->dispatch(new SavingLine($order, $line, $actor, []));
            }
        }

        $order->price_total = $builder->priceTotal();

        $this->events->dispatch(new Paying($builder, $order, $actor, $cart, $data));

        foreach ($this->paymentCallbacks as $callback) {
            $callback($builder, $order, $actor, $cart, $data);
        }

        return $builder;
    }

    // The part of the process that might throw validation errors, so we can unlock the cart after an exception
    protected function process(User $actor, Cart $cart, array $data, ServerRequestInterface $request = null): Order
    {
        $this->events->dispatch(new WillOrder($cart, $actor));

        $builder = $this->processBuilder($actor, $actor, $cart, $data, $request);

        $saveLines = [];

        foreach ($builder->lines as $group => $lines) {
            foreach ($lines as $line) {
                $saveLines[] = $line;
            }
        }

        $totalUnpaid = $builder->totalUnpaid();

        if ($totalUnpaid > 0 && $this->settings->get('flamarkt.forceOrderPrepayment')) {
            throw new ValidationException([
                'payment' => 'Not enough payment', // TODO: translation
            ]);
        }

        $this->events->dispatch(new Saving($builder->order, $actor, []));

        $cart->getConnection()->transaction(function () use ($builder, $saveLines) {
            // afterSave() callbacks will also be called inside of this transaction
            $builder->order->save();

            $builder->order->lines()->saveMany($saveLines);
            $builder->order->payments()->saveMany($builder->payments);
        });

        return $builder->order;
    }
}
