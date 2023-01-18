<?php

namespace Flamarkt\Core\Api\Serializer;

use Flamarkt\Core\Cart\Cart;
use Flarum\Api\Serializer\AbstractSerializer;
use Tobscure\JsonApi\Relationship;

class CartSerializer extends AbstractSerializer
{
    use UidSerializerTrait;

    protected $type = 'flamarkt-carts';

    /**
     * @param Cart $cart
     * @return array
     */
    protected function getDefaultAttributes($cart): array
    {
        return [
            'productCount' => $cart->product_count,
            'priceTotal' => $cart->price_total,
            'canAddProducts' => $this->actor->can('addProducts', $cart),
            'canCheckout' => $this->actor->can('checkout', $cart),
        ];
    }

    public function products(Cart $cart): ?Relationship
    {
        return $this->hasMany($cart, ProductSerializer::class);
    }
}
