<?php

namespace Flamarkt\Core\Api\Serializer;

use Flamarkt\Core\Product\Product;

class ProductSerializer extends BasicProductSerializer
{
    protected function getDefaultAttributes($product): array
    {
        $attributes = parent::getDefaultAttributes($product) + [
                'description' => $product->description,
                'descriptionHtml' => $product->formatDescription($this->request),
                'price' => $product->price,
            ];

        // We can't pre-load the correct cart from here since we don't have access to the request
        // Instead the cart should always be set in the controller that might return products that require it
        if ($state = $product->cartState) {
            $attributes += [
                'cartQuantity' => $state->quantity,
            ];
        }

        // Core does not include any relationship on that state, but we take care of the loading
        Product::setStateUser($this->actor);

        return $attributes;
    }
}
