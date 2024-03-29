<?php

namespace Flamarkt\Core\Payment;

use Flarum\Foundation\AbstractValidator;

class PaymentValidator extends AbstractValidator
{
    protected ?Payment $payment = null;

    // Not used internally, but necessary for extensions using the Validator extender
    public function getPayment(): Payment
    {
        return $this->payment;
    }

    public function setPayment(Payment $payment)
    {
        $this->payment = $payment;
    }

    protected $rules = [
        'method' => [
            'nullable',
            'string',
            'max:255',
        ],
        'identifier' => [
            'nullable',
            'string',
            'max:255',
        ],
        'amount' => [
            'integer',
            'min:-2147483648', // MySQL signed INT range
            'max:2147483647',
        ],
    ];
}
