<?php

namespace Flamarkt\Core\Api\Serializer;

use Flamarkt\Core\Product\AvailabilityManager;
use Flamarkt\Core\Product\PriceManager;
use Flamarkt\Core\Product\Product;
use Flarum\Http\SlugManager;
use Tobscure\JsonApi\Relationship;
use Tobscure\JsonApi\Resource;

class ProductSerializer extends BasicProductSerializer
{
    public function __construct(
        SlugManager                   $slugManager,
        protected AvailabilityManager $availability,
        protected PriceManager        $price
    )
    {
        parent::__construct($slugManager);
    }

    protected function getDefaultAttributes($product): array
    {
        $attributes = parent::getDefaultAttributes($product) + [
                'description' => $product->description,
                'descriptionHtml' => $product->formatDescription($this->request),
                'canOrder' => $this->availability->canOrder($product, $this->actor, $this->request),
                'price' => $this->price->price($product, $this->actor, $this->request),
            ];

        // canOrder was renamed to canAddToCart for clarity
        // We keep the original for backward compatibility and also because it might be implemented with a different meaning in the future
        $attributes['canAddToCart'] = $attributes['canOrder'];

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
                'hiddenAt' => $this->formatDate($product->hidden_at),
            ];
        }

        if ($product->hidden_at) {
            $attributes['isHidden'] = true;
        }

        // Core does not include any relationship on that state, but we take care of the loading
        Product::setStateUser($this->actor);

        return $attributes;
    }

    public function cart($product): ?Relationship
    {
        // It was supposed to work with just $product->cart and the regular relation definition
        // But I can't figure out why the relation value is NULL in the serializer while perfectly fine in the controller
        $data = $product->getCartFromState();

        if ($data) {
            $serializer = $this->resolveSerializer(CartSerializer::class, $product, $data);

            return new Relationship(new Resource($data, $serializer));
        }

        return null;
    }
}
