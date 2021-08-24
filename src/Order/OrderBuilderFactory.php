<?php

namespace Flamarkt\Core\Order;

use Flamarkt\Core\Cart\Cart;
use Flamarkt\Core\Order\Event\Created;
use Flamarkt\Core\Order\Event\Ordering;
use Flamarkt\Core\Order\Event\Paying;
use Flamarkt\Core\Order\Event\Saving;
use Flamarkt\Core\Order\Event\SavingLine;
use Flamarkt\Core\Product\AvailabilityManager;
use Flamarkt\Core\Product\PriceManager;
use Flarum\Foundation\ValidationException;
use Flarum\User\User;
use Illuminate\Contracts\Events\Dispatcher;
use Psr\Http\Message\ServerRequestInterface;

class OrderBuilderFactory
{
    protected $events;
    protected $availability;
    protected $price;

    public function __construct(Dispatcher $events, AvailabilityManager $availability, PriceManager $price)
    {
        $this->events = $events;
        $this->availability = $availability;
        $this->price = $price;
    }

    public function build(User $actor, Cart $cart, array $data, ServerRequestInterface $request = null): Order
    {
        $actor->assertCan('flamarkt.shop');

        $order = new Order();
        $order->user()->associate($actor);

        $builder = new OrderBuilder();

        if ($cart->products->isEmpty()) {
            throw new ValidationException([
                'products' => 'Cart is empty',
            ]);
        }

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

        $order->updateMeta()->save();

        $this->events->dispatch(new Created($order, $actor));

        return $order;
    }
}
