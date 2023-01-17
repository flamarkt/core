<?php

namespace Flamarkt\Core\Notification;

use ClarkWinkelmann\Mithril2Html\ComponentInterface;
use Flamarkt\Core\Mithril2Html\OrderComponent;
use Flamarkt\Core\Order\Order;
use Flarum\Notification\Blueprint\BlueprintInterface;
use Flarum\Notification\MailableInterface;
use Flarum\User\User;
use Symfony\Contracts\Translation\TranslatorInterface;

abstract class AbstractOrderUpdateBlueprint implements BlueprintInterface, MailableInterface
{
    public function __construct(
        public Order $order
    )
    {
    }

    public function getSubject(): Order
    {
        return $this->order;
    }

    public function getFromUser(): ?User
    {
        return null;
    }

    public function getData()
    {
    }

    public static function getSubjectModel(): string
    {
        return Order::class;
    }

    public function getEmailView(): array
    {
        return ['html' => 'flamarkt::email.orderUpdated'];
    }

    public function getEmailSubject(TranslatorInterface $translator): string
    {
        return $translator->trans('flamarkt-core.email.orderUpdated.subject', [
            '{number}' => $this->order->id,
        ]);
    }

    public function getEmailMessage(TranslatorInterface $translator): string
    {
        return '<p>' . htmlspecialchars($translator->trans('flamarkt-core.email.orderUpdated.message')) . '</p>';
    }

    public function getEmailComponent(): ComponentInterface
    {
        return new OrderComponent($this->order, $this->getType());
    }
}
