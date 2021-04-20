<?php

namespace Flamarkt\Core;

use Flarum\User\Access\AbstractPolicy;
use Flarum\User\User;

class GlobalPolicy extends AbstractPolicy
{
    public function backoffice(User $actor)
    {
        return $actor->isAdmin();
    }
}
