<?php

namespace Flamarkt\Core\Product;

use Carbon\Carbon;
use Flamarkt\Core\Cart\Cart;
use Flamarkt\Core\Database\HasUid;
use Flamarkt\Core\Product\Event\Hidden;
use Flamarkt\Core\Product\Event\Restored;
use Flarum\Database\AbstractModel;
use Flarum\Database\ScopeVisibilityTrait;
use Flarum\Formatter\Formatter;
use Flarum\Foundation\EventGeneratorTrait;
use Flarum\User\User;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;

/**
 * @property int $id
 * @property string $uid
 * @property string $title
 * @property string $description
 * @property string $parsed_description
 * @property int $price
 * @property string $availability_driver
 * @property string $price_driver
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property Carbon $hidden_at
 *
 * @property CartState $cartState
 * @property UserState $userState
 * @property ?Cart $cart
 */
class Product extends AbstractModel
{
    use HasUid, EventGeneratorTrait, ScopeVisibilityTrait;

    protected $table = 'flamarkt_products';

    public $timestamps = true;

    protected $casts = [
        'price' => 'int',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'hidden_at' => 'datetime',
    ];

    protected static Formatter $formatter;

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'flamarkt_product_user');
    }

    protected static ?Cart $stateCart = null;

    public function cartState(Cart $cart = null): HasOne
    {
        $cart = $cart ?: static::$stateCart;

        return $this->hasOne(CartState::class)->where('cart_id', $cart?->id);
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

    /**
     * Used as a way to access the cart from ProductSerializer because somehow the fake relation isn't accessible
     */
    public function getCartFromState(): ?Cart
    {
        return static::$stateCart;
    }

    protected static ?User $stateUser = null;

    public function userState(User $user = null): HasOne
    {
        $user = $user ?: static::$stateUser;

        return $this->hasOne(UserState::class)->where('user_id', $user?->id);
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

    public function getDescriptionAttribute($value): ?string
    {
        if (!$value) {
            return null;
        }

        return static::$formatter->unparse($value);
    }

    public function getParsedDescriptionAttribute(): ?string
    {
        return $this->attributes['description'];
    }

    public function setDescriptionAttribute(string $value = null)
    {
        $this->attributes['description'] = $value ? static::$formatter->parse($value, $this) : null;
    }

    public function setParsedDescriptionAttribute(string $value = null)
    {
        $this->attributes['description'] = $value;
    }

    public function formatDescription(ServerRequestInterface $request = null): ?string
    {
        // Use Arr::get because the key might not exist if the model was just created and never retrieved from database
        $description = Arr::get($this->attributes, 'description');

        if (!$description) {
            return null;
        }

        return static::$formatter->render($description, $this, $request);
    }

    public static function getFormatter(): Formatter
    {
        return static::$formatter;
    }

    public static function setFormatter(Formatter $formatter): void
    {
        static::$formatter = $formatter;
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

    public function cart(): HasOne
    {
        // Intentionally designed so the column names are valid, but it would never return anything
        // It will only ever be manually populated through the ProductRepository
        return $this->hasOne(Cart::class, 'order_id')->whereRaw('1=0');
    }
}
