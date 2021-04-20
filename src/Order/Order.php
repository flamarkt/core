<?php

namespace Flamarkt\Core\Order;

use Carbon\Carbon;
use Flarum\Database\AbstractModel;
use Flarum\Database\ScopeVisibilityTrait;
use Flarum\Foundation\EventGeneratorTrait;
use Flarum\User\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Relations;

/**
 * @property int $id
 * @property int $user_id
 * @property string $status
 * @property int $price_total
 * @property Carbon $created_at
 * @property Carbon $updated_at
 *
 * @property User|null $user
 * @property OrderLine[]|Collection $lines
 * @property OrderPayment[]|Collection $payments
 */
class Order extends AbstractModel
{
    use EventGeneratorTrait, ScopeVisibilityTrait;

    protected $table = 'flamarkt_orders';

    public $timestamps = true;

    protected $casts = [
        'price_total' => 'int',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'hidden_at' => 'datetime',
    ];

    public function user(): Relations\BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function lines(): Relations\HasMany
    {
        return $this->hasMany(OrderLine::class);
    }

    public function payments(): Relations\HasMany
    {
        return $this->hasMany(OrderPayment::class);
    }
}
