<?php

namespace Flamarkt\Core\Product\Scope;

use Flarum\User\User;
use Illuminate\Database\Eloquent\Builder;

class View
{
    public function __invoke(User $actor, Builder $query)
    {
        if (!$actor->can('backoffice')) {
            $query->whereNull('hidden_at');
        }
    }
}
