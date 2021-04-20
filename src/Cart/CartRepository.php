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

    public function find($id, User $actor = null): ?Cart
    {
        return $this->visibleTo($actor)->find($id);
    }

    public function findOrFail($id, User $actor = null): Cart
    {
        return $this->visibleTo($actor)->findOrFail($id);
    }

    public function store(User $actor): Cart
    {
        $cart = new Cart();
        $cart->user_id = $actor->id;
        $cart->save();

        return $cart;
    }
}
