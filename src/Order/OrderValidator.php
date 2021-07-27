<?php

namespace Flamarkt\Core\Order;

use Flarum\Foundation\AbstractValidator;

class OrderValidator extends AbstractValidator
{
    protected $rules = [
        'userId' => 'nullable|exists:users,id',
    ];
}
