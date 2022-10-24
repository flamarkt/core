<?php

namespace Flamarkt\Core\Product;

use Flarum\Foundation\AbstractValidator;

class ProductValidator extends AbstractValidator
{
    protected $product;

    // Not used internally, but necessary for extensions using the Validator extender
    public function getProduct(): ?Product
    {
        return $this->product;
    }

    public function setProduct(Product $product)
    {
        $this->product = $product;
    }

    protected $rules = [
        'title' => [
            'required',
            'string',
            'min:1',
            'max:255',
        ],
        'description' => [
            'nullable',
            'string',
            'max:65535',
        ],
    ];
}
