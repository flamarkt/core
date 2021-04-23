<?php

namespace Flamarkt\Core\Order;

use Flamarkt\Core\Product\Product;
use Flarum\Database\AbstractModel;
use Illuminate\Database\Eloquent\Relations;

/**
 * @property int $id
 * @property int $order_id
 * @property int $product_id
 * @property int $number
 * @property string $group
 * @property string $type
 * @property string $label
 * @property string $comment
 * @property int $price_unit
 * @property int $quantity
 * @property int $price_total
 *
 * @property Product|null $product
 */
class OrderLine extends AbstractModel
{
    protected $table = 'flamarkt_order_lines';

    protected $casts = [
        'number' => 'int',
        'price_unit' => 'int',
        'quantity' => 'int',
        'price_total' => 'int',
    ];

    public function order(): Relations\BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    public function product(): Relations\BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
