<?php

namespace Flamarkt\Core\Cart;

use Carbon\Carbon;
use Flamarkt\Core\Database\HasUid;
use Flamarkt\Core\Order\OrderBuilderFactory;
use Flamarkt\Core\Product\Product;
use Flarum\Database\AbstractModel;
use Flarum\Database\ScopeVisibilityTrait;
use Flarum\Foundation\EventGeneratorTrait;
use Flarum\User\Guest;
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
 * @property int $amount_due_after_partial
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
    use HasUid, EventGeneratorTrait, ScopeVisibilityTrait;

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
        // Hard-code cart_id column name to prevent GuestCart from trying to use a different auto-generated name
        return $this->belongsToMany(Product::class, 'flamarkt_cart_product', 'cart_id')
            // We inject a visibility scope here to allow extensions to customize the relationship
            // However the actor is not available, it will always be guest
            // This is mostly for changing the sort order and optionally creating fully invisible products
            ->whereVisibleTo(new Guest(), 'cart')
            ->withPivot('quantity');
    }

    public function updateMeta(): void
    {
        $this->product_count = $this->products()->count();

        try {
            $builder = resolve(OrderBuilderFactory::class)->pretend($this);
            $this->price_total = $builder->priceTotal();
            $this->amount_due_after_partial = $builder->totalUnpaid();
        } catch (\Exception $exception) {
            $this->price_total = null;
            $this->amount_due_after_partial = null;
        }

        $this->save();
    }

    public function getAlreadySubmittedAttribute(): bool
    {
        return !is_null($this->order_id);
    }
}
