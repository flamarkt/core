<?php

namespace Flamarkt\Core\Product;

use Carbon\Carbon;
use Flamarkt\Core\Cart\Cart;
use Flarum\Database\AbstractModel;
use Flarum\Database\ScopeVisibilityTrait;
use Flarum\Foundation\EventGeneratorTrait;
use Flarum\User\User;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * @property int $id
 * @property string $title
 * @property string $description
 * @property int $price
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property Carbon $hidden_at
 *
 * @property CartState $cartState
 * @property UserState $userState
 */
class Product extends AbstractModel
{
    use EventGeneratorTrait, ScopeVisibilityTrait;

    protected $table = 'flamarkt_products';

    public $timestamps = true;

    protected $casts = [
        'price' => 'int',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'hidden_at' => 'datetime',
    ];

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }

    protected static $stateCart;

    public function cartState(Cart $cart = null): HasOne
    {
        $cart = $cart ?: static::$stateCart;

        return $this->hasOne(CartState::class)->where('cart_id', $cart ? $cart->id : null);
    }

    public function stateForCart(Cart $cart): CartState
    {
        $state = $this->cartState($cart)->first();

        if (!$state) {
            $state = new CartState;
            $state->product_id = $this->id;
            $state->cart_id = $cart->id;
        }

        return $state;
    }

    public static function setStateCart(Cart $cart = null)
    {
        static::$stateCart = $cart;
    }

    protected static $stateUser;

    public function userState(User $user = null): HasOne
    {
        $user = $user ?: static::$stateUser;

        return $this->hasOne(UserState::class)->where('user_id', $user ? $user->id : null);
    }

    public function stateForUser(User $user): UserState
    {
        $state = $this->userState($user)->first();

        if (!$state) {
            $state = new UserState;
            $state->product_id = $this->id;
            $state->user_id = $user->id;
        }

        return $state;
    }

    public static function setStateUser(User $user)
    {
        static::$stateUser = $user;
    }
}
