<?php

namespace Flamarkt\Core\Listener;

use Flamarkt\Core\Order\Event;
use Flarum\User\User;
use Illuminate\Contracts\Events\Dispatcher;

class UpdateUserOrderMeta
{
    public function subscribe(Dispatcher $events)
    {
        $events->listen([
            Event\Created::class,
            Event\Deleted::class,
            Event\UserChanged::class,
        ], [$this, 'handle']);
    }

    /**
     * @param Event\Created|Event\Deleted|Event\UserChanged $event
     */
    public function handle($event)
    {
        if ($event instanceof Event\UserChanged && $event->oldUser) {
            $this->updateUser($event->oldUser);
        }

        if ($event->order->user) {
            $this->updateUser($event->order->user);
        }
    }

    protected function updateUser(User $user)
    {
        // We include soft-deleted orders
        $user->flamarkt_order_count = $user->orders()->count();
        $user->save();
    }
}
