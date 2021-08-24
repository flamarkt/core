<?php

namespace Flamarkt\Core\Order;

use Illuminate\Support\Arr;

class OrderBuilder
{
    /**
     * @var OrderLine[]
     */
    public $lines = [];

    /**
     * @var OrderPayment[]
     */
    public $payments = [];

    public function addLine(string $group = null, string $type = null): OrderLine
    {
        if (!Arr::exists($this->lines, $group ?? '')) {
            $this->lines[$group ?? ''] = [];
        }

        $line = new OrderLine();
        $line->group = $group;
        $line->type = $type;

        $this->lines[$group ?? ''][] = $line;

        return $line;
    }

    public function addPayment(string $method, int $amount, string $identifier = null): OrderPayment
    {
        $payment = new OrderPayment();
        $payment->method = $method;
        $payment->identifier = $identifier;
        $payment->amount = $amount;

        $this->payments[] = $payment;

        return $payment;
    }
}
