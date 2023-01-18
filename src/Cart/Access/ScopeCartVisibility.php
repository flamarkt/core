<?php

namespace Flamarkt\Core\Cart\Access;

use Flarum\User\User;
use Illuminate\Database\Eloquent\Builder;

class ScopeCartVisibility
{
    public function __invoke(User $actor, Builder $query): void
    {
        $query->where('user_id', $actor->id);
    }
}
