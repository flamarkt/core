<?php

namespace Flamarkt\Core\Notification;

use Flamarkt\Core\Order\Order;
use Flarum\Notification\Blueprint\BlueprintInterface;
use Flarum\Notification\MailableInterface;
use Symfony\Contracts\Translation\TranslatorInterface;

class OrderReceivedBlueprint implements BlueprintInterface, MailableInterface
{
    public $order;

    public function __construct(Order $order)
    {
        $this->order = $order;
    }

    public function getSubject()
    {
        return $this->order;
    }

    public function getFromUser()
    {
        return null;
    }

    public function getData()
    {
    }

    public static function getType(): string
    {
        return 'orderReceived';
    }

    public static function getSubjectModel(): string
    {
        return Order::class;
    }

    public function getEmailView(): array
    {
        return ['text' => 'flamarkt::emails.orderReceived'];
    }

    public function getEmailSubject(TranslatorInterface $translator)
    {
        return $translator->trans('flamarkt-core.email.orderReceived.subject', [
            '{number}' => $this->order->id,
        ]);
    }
}
