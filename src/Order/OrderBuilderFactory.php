<?php

namespace Flamarkt\Core\Order;

use Flamarkt\Core\Cart\Cart;
use Flamarkt\Core\Cart\CartLock;
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
use Ramsey\Uuid\Uuid;

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

        if ($this->lock->isLocked($cart)) {
            throw new ValidationException([
                'products' => 'This order is already being processed in a different window.',
            ]);
        }

        $this->lock->lock($cart);

        try {
            $order = $this->process($actor, $cart, $data, $request);

            $cart->order_id = $order->id;
            $cart->save();
        } finally {
            // Only unlock after the cart has been marked as submitted
            $this->lock->unlock($cart);
        }

        $order->updateMeta()->save();

        $this->events->dispatch(new Created($order, $actor));

        return $order;
    }

    // The part of the process that might throw validation errors, so we can unlock the cart after an exception
    protected function process(User $actor, Cart $cart, array $data, ServerRequestInterface $request = null): Order
    {
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

        if ($cart->products->isEmpty()) {
            throw new ValidationException([
                'products' => 'Cart is empty',
            ]);
        }

        $order = new Order();
        $order->uid = Uuid::uuid4()->toString();
        $order->user()->associate($actor);

        $builder = new OrderBuilder();

        foreach ($cart->products as $product) {
            $actor->assertPermission($this->availability->canOrder($product, $actor));

            $line = $builder->addLine(null, 'product');
            $line->product()->associate($product);
            $line->quantity = $product->pivot->quantity;
            $line->price_unit = $this->price->price($product, $actor, $request);
            $line->updateTotal();
        }

        $this->events->dispatch(new Ordering($builder, $order, $actor, $cart, $data));

        $saveLines = [];

        $number = 0;

        foreach ($builder->lines as $group => $lines) {
            foreach ($lines as $line) {
                $line->number = ++$number;
                $saveLines[] = $line;

                $this->events->dispatch(new SavingLine($order, $line, $actor, []));
            }
        }

        $order->price_total = $builder->priceTotal();

        $this->events->dispatch(new Paying($builder, $order, $actor, $cart, $data));

        foreach ($this->paymentCallbacks as $callback) {
            $callback($builder, $order, $actor, $cart, $data);
        }

        $totalUnpaid = $builder->totalUnpaid();

        if ($totalUnpaid > 0 && $this->settings->get('flamarkt.forceOrderPrepayment')) {
            throw new ValidationException([
                'payment' => 'Not enough payment', // TODO: translation
            ]);
        }

        $this->events->dispatch(new Saving($order, $actor, []));

        $order->save();

        $order->lines()->saveMany($saveLines);
        $order->payments()->saveMany($builder->payments);

        return $order;
    }
}
