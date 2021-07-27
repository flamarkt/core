<?php

namespace Flamarkt\Core\Order;

use Flarum\Foundation\AbstractValidator;

class OrderLineValidator extends AbstractValidator
{
    protected $rules = [
        'group' => 'nullable|in:shipping',
        'type' => 'nullable|in:product,manual',
        'label' => 'nullable|string|max:255',
        'comment' => 'nullable|string|max:255',
        'productId' => 'exists:flamarkt_products,id',
        'quantity' => 'integer',
        'priceUnit' => 'integer',
    ];
}
