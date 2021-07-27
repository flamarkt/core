<?php

namespace Flamarkt\Core\Product\Scope;

use Flarum\User\User;
use Illuminate\Database\Eloquent\Builder;

class Enumerate extends View
{
    public function __invoke(User $actor, Builder $query)
    {
        parent::__invoke($actor, $query);

        if ($actor->isGuest()) {
            $query->whereRaw('0=1');
        } else if ($actor->cannot('backoffice')) {
            $query->where('user_id', $actor->id);
        }
    }
}
