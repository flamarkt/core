<?php

namespace Flamarkt\Core\Api\Serializer;

use Flamarkt\Core\Order\Order;
use Flarum\Api\Serializer\AbstractSerializer;

class BasicOrderSerializer extends AbstractSerializer
{
    protected $type = 'flamarkt-orders';

    /**
     * @param Order $order
     * @return array
     */
    protected function getDefaultAttributes($order): array
    {
        return [
            'number' => 0,
        ];
    }
}
