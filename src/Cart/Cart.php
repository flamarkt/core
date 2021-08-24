<?php

namespace Flamarkt\Core\Cart;

use Carbon\Carbon;
use Flamarkt\Core\Product\Product;
use Flarum\Database\AbstractModel;
use Flarum\Database\ScopeVisibilityTrait;
use Flarum\User\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Relations;

/**
 * @property int $id
 * @property string $uid
 * @property int $user_id
 * @property int $order_id
 * @property int $product_count
 * @property int $price_total
 * @property Carbon $created_at
 * @property Carbon $updated_at
 *
 * @property-read bool $alreadySubmitted
 *
 * @property User $user
 * @property Product[]|Collection $products
 */
class Cart extends AbstractModel
{
    use ScopeVisibilityTrait;

    protected $table = 'flamarkt_carts';

    public $timestamps = true;

    protected $casts = [
        'product_count' => 'int',
        'price_total' => 'int',
    ];

    public function user(): Relations\BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function products(): Relations\BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'flamarkt_cart_product')
            ->withPivot('quantity');
    }

    public function updateMeta()
    {
        $this->product_count = $this->products()->count();
        $this->price_total = $this->products->reduce(function ($previous, Product $product) {
            return $previous + ($product->price * $product->pivot->quantity);
        }, 0);
        $this->save();
    }

    public function getAlreadySubmittedAttribute(): bool
    {
        return !is_null($this->order_id);
    }
}
