<?php

namespace Flamarkt\Core\Listener;

use Flamarkt\Core\Notification\OrderReceivedBlueprint;
use Flarum\User\Event\Saving;
use Flarum\User\Exception\PermissionDeniedException;
use Flarum\User\User;
use Illuminate\Support\Arr;

class SaveUser
{
    public function handle(Saving $event)
    {
        $attributes = (array)Arr::get($event->data, 'attributes');

        if (!empty($attributes['preferences'])) {
            // We know that if we reach this point, Flarum has already asserted permission in EditUserHandler
            foreach ($attributes['preferences'] as $k => $v) {
                // Prevent enabling order received web alert
                // If the default is false and we block here there shouldn't be any way to enable it
                if ($k === User::getNotificationPreferenceKey(OrderReceivedBlueprint::getType(), 'alert')) {
                    throw new PermissionDeniedException();
                }
            }
        }
    }
}
