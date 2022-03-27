<?php

namespace Flamarkt\Core\Api\Serializer;

use Flamarkt\Core\Payment\Payment;
use Flarum\Api\Serializer\AbstractSerializer;

class PaymentSerializer extends AbstractSerializer
{
    use UidSerializerTrait;

    protected $type = 'flamarkt-payments';

    /**
     * @param Payment $payment
     * @return array
     */
    protected function getDefaultAttributes($payment): array
    {
        $attributes = [
            'method' => $payment->method,
            'amount' => $payment->amount,
            'createdAt' => $this->formatDate($payment->created_at),
            'isHidden' => true, // TODO: soft-delete not yet implemented, but this attribute is necessary for the permanent delete component in the backend
        ];

        if ($this->actor->can('backoffice')) {
            $attributes['identifier'] = $payment->identifier;
        }

        return $attributes;
    }
}
