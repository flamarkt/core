<?php

namespace Flamarkt\Core\Api\Serializer;

use Flamarkt\Core\Order\OrderPayment;
use Flarum\Api\Serializer\AbstractSerializer;

class PaymentSerializer extends AbstractSerializer
{
    protected $type = 'flamarkt-payments';

    /**
     * @param OrderPayment $payment
     * @return array
     */
    protected function getDefaultAttributes($payment): array
    {
        return [
            'amount' => $payment->amount,
            'createdAt' => $this->formatDate($payment->created_at),
        ];
    }
}
