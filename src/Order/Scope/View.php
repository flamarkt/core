<?php

namespace Flamarkt\Core\Order\Scope;

use Flarum\User\User;
use Illuminate\Database\Eloquent\Builder;

class View
{
    public function __invoke(User $actor, Builder $query)
    {
        if (!$actor->can('backoffice')) {
            if ($actor->isGuest()) {
                $query->whereNull('user_id');
            } else {
                $query->where('user_id', $actor->id);
            }
        }
    }
}
