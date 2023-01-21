<?php

namespace Flamarkt\Core\Payment;

use Carbon\Carbon;
use Flamarkt\Core\Database\HasUid;
use Flamarkt\Core\Order\Order;
use Flamarkt\Core\Product\Product;
use Flarum\Database\AbstractModel;
use Flarum\Foundation\EventGeneratorTrait;
use Flarum\User\User;
use Illuminate\Database\Eloquent\Relations;

/**
 * @property int $id
 * @property string $uid
 * @property int $order_id
 * @property int $user_id
 * @property string $method
 * @property string $identifier
 * @property int $amount
 * @property Carbon $created_at
 * @property Carbon $updated_at
 *
 * @property Order $order
 * @property Product|null $product
 * @property User|null $user
 */
class Payment extends AbstractModel
{
    use HasUid, EventGeneratorTrait;

    protected $table = 'flamarkt_order_payments';

    public $timestamps = true;

    protected $casts = [
        'amount' => 'int',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function order(): Relations\BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    public function product(): Relations\BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function user(): Relations\BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
