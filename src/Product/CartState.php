<?php

namespace Flamarkt\Core\Product;

use Flamarkt\Core\Cart\Cart;
use Flarum\Database\AbstractModel;
use Flarum\Foundation\EventGeneratorTrait;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $cart_id
 * @property int $product_id
 * @property int $quantity
 *
 * @property Cart $cart
 * @property Product $product
 */
class CartState extends AbstractModel
{
    use EventGeneratorTrait;

    protected $table = 'flamarkt_cart_product';

    public function cart(): BelongsTo
    {
        return $this->belongsTo(Cart::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    protected function setKeysForSaveQuery($query)
    {
        $query->where('cart_id', $this->cart_id)
            ->where('product_id', $this->product_id);

        return $query;
    }
}
