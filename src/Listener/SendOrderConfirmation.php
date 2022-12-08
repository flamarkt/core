<?php

namespace Flamarkt\Core\Listener;

use Flamarkt\Core\Notification\OrderReceivedBlueprint;
use Flamarkt\Core\Order\Event\Created;
use Flarum\Notification\NotificationSyncer;

class SendOrderConfirmation
{
    public function __construct(
        protected NotificationSyncer $notifications
    )
    {
    }

    public function handle(Created $event): void
    {
        $this->notifications->sync(
            new OrderReceivedBlueprint($event->order),
            [$event->order->user]
        );
    }
}
