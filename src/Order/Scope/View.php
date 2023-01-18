<?php

namespace Flamarkt\Core\Order\Scope;

use Flarum\User\User;
use Illuminate\Database\Eloquent\Builder;

class View
{
    public function __invoke(User $actor, Builder $query): void
    {
        if (!$actor->can('backoffice')) {
            if ($actor->isGuest()) {
                // Officially guest orders are not yet implemented, but by having this rule here
                // And enumeration disabled for guests, this would allow any guest to hit any guest order with the correct UID
                $query->whereNull('user_id');
            } else {
                $query->where('user_id', $actor->id);
            }
        }
    }
}
