<?php

namespace Flamarkt\Core\Order;

use Flarum\Foundation\AbstractValidator;

class OrderLineValidator extends AbstractValidator
{
    protected $line;

    // Not used internally, but necessary for extensions using the Validator extender
    public function getOrderLine(): OrderLine
    {
        return $this->line;
    }

    public function setOrderLine(OrderLine $line)
    {
        $this->line = $line;
    }

    protected $rules = [
        'group' => [
            'nullable',
            'in:shipping',
        ],
        'type' => [
            'nullable',
            'in:product,manual',
        ],
        'label' => [
            'nullable',
            'string',
            'max:255',
        ],
        'comment' => [
            'nullable',
            'string',
            'max:255',
        ],
        'productUid' => [
            'exists:flamarkt_products,uid',
        ],
        'quantity' => [
            'integer',
        ],
        'priceUnit' => [
            'integer',
        ],
    ];
}
