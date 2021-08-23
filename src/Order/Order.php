<?php

namespace Flamarkt\Core\Order;

use Carbon\Carbon;
use Flamarkt\Core\Order\Event\Hidden;
use Flamarkt\Core\Order\Event\Restored;
use Flamarkt\Core\Product\Product;
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
 * @property int $paid_amount
 * @property int $product_count
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property Carbon $hidden_at
 *
 * @property User|null $user
 * @property OrderLine[]|Collection $lines
 * @property OrderPayment[]|Collection $payments
 * @property Product[]|Collection $products
 */
class Order extends AbstractModel
{
    use EventGeneratorTrait, ScopeVisibilityTrait;

    protected $table = 'flamarkt_orders';

    public $timestamps = true;

    protected $casts = [
        'price_total' => 'int',
        'paid_amount' => 'int',
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

    public function products(): Relations\BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'flamarkt_order_lines');
    }

    public function hide(): self
    {
        if (!$this->hidden_at) {
            $this->hidden_at = Carbon::now();

            $this->raise(new Hidden($this));
        }

        return $this;
    }

    public function restore(): self
    {
        if ($this->hidden_at !== null) {
            $this->hidden_at = null;

            $this->raise(new Restored($this));
        }

        return $this;
    }

    public function updateMeta(): self
    {
        $this->price_total = $this->lines()->sum('price_total');
        $this->paid_amount = $this->payments()->sum('amount');
        $this->product_count = $this->products()->count();

        return $this;
    }
}
