<?php

namespace Flamarkt\Core\Order;

use Flamarkt\Core\Cart\Cart;
use Flamarkt\Core\Order\Event\Ordering;
use Flamarkt\Core\Order\Event\Paying;
use Flamarkt\Core\Order\Event\Saving;
use Flamarkt\Core\Order\Event\SavingLine;
use Flarum\Foundation\ValidationException;
use Flarum\User\User;
use Illuminate\Contracts\Events\Dispatcher;

class OrderBuilderFactory
{
    protected $events;

    public function __construct(Dispatcher $events)
    {
        $this->events = $events;
    }

    public function build(User $actor, Cart $cart, array $data): Order
    {
        $builder = new OrderBuilder();

        if ($cart->products->isEmpty()) {
            throw new ValidationException([
                'products' => 'Cart is empty',
            ]);
        }

        foreach ($cart->products as $product) {
            $line = $builder->addLine('products');
            $line->product()->associate($product);
            $line->quantity = $product->pivot->quantity;
            $line->price_unit = $product->price;
            $line->price_total = $product->pivot->quantity * $product->price;
        }

        $this->events->dispatch(new Ordering($builder, $actor, $cart, $data));

        $order = new Order();
        $order->user()->associate($actor);

        $saveLines = [];

        $number = 0;
        $priceTotal = 0;

        foreach ($builder->lines as $group => $lines) {
            foreach ($lines as $line) {
                /**
                 * @var OrderLine $line
                 */
                $line->number = ++$number;
                $saveLines[] = $line;

                $this->events->dispatch(new SavingLine($order, $line, $actor, []));

                $priceTotal += $line->price_total;
            }
        }

        $order->price_total = $priceTotal;

        $this->events->dispatch(new Paying($builder, $order, $actor, $cart, $data));

        $totalFromPayments = 0;

        foreach ($builder->payments as $payment) {
            $totalFromPayments += $payment->amount;
        }

        // TODO: pre-payment will be an optional feature
        if ($totalFromPayments < $priceTotal) {
            throw new ValidationException([
                'payment' => 'Not enough payment',
            ]);
        }

        $this->events->dispatch(new Saving($order, $actor, []));

        $order->save();

        $order->lines()->saveMany($saveLines);
        $order->payments()->saveMany($builder->payments);

        return $order;
    }
}
