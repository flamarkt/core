<?php

namespace Flamarkt\Core\Cart;

use Flarum\User\User;
use Illuminate\Database\Eloquent\Builder;

class CartRepository
{
    public function query(): Builder
    {
        return Cart::query();
    }

    public function visibleTo(User $actor = null): Builder
    {
        $query = $this->query();

        if ($actor) {
            return $query->whereVisibleTo($actor);
        }

        return $query;
    }

    /**
     * @internal Kept just in case, but should be avoided
     */
    public function findId($id, User $actor = null): ?Cart
    {
        return $this->visibleTo($actor)->find($id);
    }

    public function findUid(string $uid = null, User $actor = null): ?Cart
    {
        return $this->visibleTo($actor)->where('uid', $uid)->first();
    }

    /**
     * @internal Kept just in case, but should be avoided
     */
    public function findIdOrFail($id, User $actor = null): Cart
    {
        return $this->visibleTo($actor)->findOrFail($id);
    }

    public function findUidOrFail(string $uid = null, User $actor = null): Cart
    {
        return $this->visibleTo($actor)->where('uid', $uid)->firstOrFail();
    }

    public function store(User $actor): Cart
    {
        $cart = new Cart();
        $cart->user_id = $actor->id;
        $cart->save();

        return $cart;
    }
}
