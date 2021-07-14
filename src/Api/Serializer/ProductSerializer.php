<?php

namespace Flamarkt\Core\Api\Serializer;

use Flamarkt\Core\Product\AvailabilityManager;
use Flamarkt\Core\Product\PriceManager;
use Flamarkt\Core\Product\Product;

class ProductSerializer extends BasicProductSerializer
{
    protected $availability;
    protected $price;

    public function __construct(AvailabilityManager $availability, PriceManager $price)
    {
        $this->availability = $availability;
        $this->price = $price;
    }

    protected function getDefaultAttributes($product): array
    {
        $attributes = parent::getDefaultAttributes($product) + [
                'description' => $product->description,
                'descriptionHtml' => $product->formatDescription($this->request),
                'canOrder' => $this->availability->canOrder($product, $this->actor, $this->request),
                'price' => $this->price->price($product, $this->actor, $this->request),
            ];

        // We can't pre-load the correct cart from here since we don't have access to the request
        // Instead the cart should always be set in the controller that might return products that require it
        if ($state = $product->cartState) {
            $attributes += [
                'cartQuantity' => $state->quantity,
            ];
        }

        if ($this->actor->can('backoffice')) {
            $attributes += [
                'canEdit' => true,
                'priceEdit' => $product->price,
                'availabilityDriver' => $product->availability_driver,
                'priceDriver' => $product->price_driver,
                'createdAt' => $this->formatDate($product->created_at),
                'updatedAt' => $this->formatDate($product->updated_at),
            ];
        }

        // Core does not include any relationship on that state, but we take care of the loading
        Product::setStateUser($this->actor);

        return $attributes;
    }
}
