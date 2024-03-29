<?php

namespace Flamarkt\Core\Order;

use Flamarkt\Core\Cart\Cart;
use Flamarkt\Core\Payment\Payment;
use Flarum\User\User;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;

class OrderBuilder
{
    public function __construct(
        public Order                   $order,
        public User                    $actor,
        public Cart                    $cart,
        public ?ServerRequestInterface $request = null,
        public bool                    $pretend = false
    )
    {
    }

    /**
     * @var OrderLine[][]
     */
    public array $lines = [];

    /**
     * @var Payment[]
     */
    public array $payments = [];

    public function addLine(string $group = null, string $type = null): OrderLine
    {
        if (!Arr::exists($this->lines, $group ?? 'default')) {
            $this->lines[$group ?? 'default'] = [];
        }

        $line = new OrderLine();
        $line->group = $group;
        $line->type = $type;

        $this->lines[$group ?? 'default'][] = $line;

        return $line;
    }

    public function addPayment(string $method, int $amount, string $identifier = null): Payment
    {
        $payment = new Payment();
        $payment->method = $method;
        $payment->identifier = $identifier;
        $payment->amount = $amount;

        $this->payments[] = $payment;

        return $payment;
    }

    public function priceTotal(): int
    {
        $total = 0;

        foreach ($this->lines as $group => $lines) {
            foreach ($lines as $line) {
                $total += $line->price_total;
            }
        }

        return $total;
    }

    public function totalPaid(): int
    {
        $total = 0;

        foreach ($this->payments as $payment) {
            $total += $payment->amount;
        }

        return $total;
    }

    public function totalUnpaid(): int
    {
        return $this->priceTotal() - $this->totalPaid();
    }
}
