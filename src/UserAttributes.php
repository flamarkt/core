<?php

namespace Flamarkt\Core;

use Flarum\Api\Serializer\UserSerializer;
use Flarum\User\User;

class UserAttributes
{
    public function __invoke(UserSerializer $serializer, User $user): array
    {
        if ($serializer->getActor()->cannot('backoffice')) {
            return [];
        }

        return [
            'flamarktOrderCount' => (int)$user->flamarkt_order_count,
        ];
    }
}
