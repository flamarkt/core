<?php

namespace Flamarkt\Core\Product\Scope;

use Flarum\User\User;
use Illuminate\Database\Eloquent\Builder;

class View
{
    public function __invoke(User $actor, Builder $query): void
    {
        if ($actor->can('backoffice')) {
            // Return early for backoffice permission, there won't be any restriction
            return;
        }

        if (!$actor->hasPermission('flamarkt.browse')) {
            // Block access to catalog
            $query->whereRaw('0=1');
            return;
        }

        // For regular users with browse permission, show all non-hidden
        $query->whereNull('hidden_at');
    }
}
