<?php

namespace Flamarkt\Core\Product;

use Flarum\Foundation\AbstractValidator;

class ProductValidator extends AbstractValidator
{
    protected $rules = [
        'title' => 'required|string|min:1|max:255',
        'description' => 'nullable|string|max:65535',
    ];
}
