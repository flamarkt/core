<?php

namespace Flamarkt\Core\Notification;

use Symfony\Contracts\Translation\TranslatorInterface;

class OrderReceivedBlueprint extends AbstractOrderUpdateBlueprint
{
    public static function getType(): string
    {
        return 'orderReceived';
    }

    public function getEmailSubject(TranslatorInterface $translator): string
    {
        return $translator->trans('flamarkt-core.email.orderReceived.subject', [
            '{number}' => $this->order->id,
        ]);
    }

    public function getEmailMessage(TranslatorInterface $translator): string
    {
        return '<p>' . htmlspecialchars($translator->trans('flamarkt-core.email.orderReceived.message')) . '</p>';
    }
}
