<?php

namespace Flamarkt\Core\Product;

use Flarum\Database\AbstractModel;
use Flarum\Foundation\EventGeneratorTrait;
use Flarum\User\User;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $product_id
 * @property int $user_id
 *
 * @property Product $product
 * @property User $user
 */
class UserState extends AbstractModel
{
    use EventGeneratorTrait;

    protected $table = 'flamarkt_product_user';

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    protected function setKeysForSaveQuery($query)
    {
        $query->where('product_id', $this->product_id)
            ->where('user_id', $this->user_id);

        return $query;
    }
}
