<?php

namespace Flamarkt\Core\Order\Scope;

use Flarum\User\User;
use Illuminate\Database\Eloquent\Builder;

class Enumerate extends View
{
    public function __invoke(User $actor, Builder $query)
    {
        parent::__invoke($actor, $query);

        if ($actor->isGuest()) {
            $query->whereRaw('1=0');
        }
    }
}
