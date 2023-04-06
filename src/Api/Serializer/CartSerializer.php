<?php

namespace Flamarkt\Core\Api\Serializer;

use Flamarkt\Core\Cart\Cart;
use Flamarkt\Core\Cart\CartLock;
use Flarum\Api\Serializer\AbstractSerializer;
use Tobscure\JsonApi\Relationship;

class CartSerializer extends AbstractSerializer
{
    use UidSerializerTrait;

    protected $type = 'flamarkt-carts';

    public function __construct(
        protected CartLock $lock
    )
    {
    }

    /**
     * @param Cart $cart
     * @return array
     */
    protected function getDefaultAttributes($cart): array
    {
        return [
            'productCount' => $cart->product_count,
            'priceTotal' => $cart->price_total,
            'amountDueAfterPartial' => $cart->amount_due_after_partial,
            'canAddProducts' => $this->actor->can('addProducts', $cart),
            'canCheckout' => $this->actor->can('checkout', $cart),
            'isLocked' => $this->lock->isContentLocked($cart) || $this->lock->isSubmitLocked($cart),
        ];
    }

    public function products(Cart $cart): ?Relationship
    {
        return $this->hasMany($cart, ProductSerializer::class);
    }
}
