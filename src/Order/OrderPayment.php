<?php

namespace Flamarkt\Core\Order;

use Carbon\Carbon;
use Flamarkt\Core\Product\Product;
use Flarum\Database\AbstractModel;
use Flarum\User\User;
use Illuminate\Database\Eloquent\Relations;

/**
 * @property int $id
 * @property int $order_id
 * @property int $user_id
 * @property string $method
 * @property string $identifier
 * @property int $amount
 * @property Carbon $created_at
 * @property Carbon $updated_at
 *
 * @property Product|null $product
 * @property User|null $user
 */
class OrderPayment extends AbstractModel
{
    protected $table = 'flamarkt_order_payments';

    public $timestamps = true;

    protected $casts = [
        'amount' => 'int',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function product(): Relations\BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function user(): Relations\BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
