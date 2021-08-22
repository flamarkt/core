<?php

namespace Flamarkt\Core\Listener;

use Flamarkt\Core\Notification\OrderReceivedBlueprint;
use Flamarkt\Core\Order\Event\Created;
use Flarum\Notification\NotificationSyncer;

class SendOrderConfirmation
{
    protected $notifications;

    public function __construct(NotificationSyncer $notifications)
    {
        $this->notifications = $notifications;
    }

    public function handle(Created $event)
    {
        $this->notifications->sync(
            new OrderReceivedBlueprint($event->order),
            [$event->order->user]
        );
    }
}
