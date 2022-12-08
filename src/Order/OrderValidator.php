<?php

namespace Flamarkt\Core\Order;

use Flarum\Foundation\AbstractValidator;

class OrderValidator extends AbstractValidator
{
    protected ?Order $order = null;

    // Not used internally, but necessary for extensions using the Validator extender
    public function getOrder(): Order
    {
        return $this->order;
    }

    public function setOrder(Order $order)
    {
        $this->order = $order;
    }

    protected $rules = [
        'userId' => [
            'nullable',
            'exists:users,id',
        ],
    ];
}
