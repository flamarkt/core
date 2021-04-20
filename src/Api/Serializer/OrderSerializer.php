<?php

namespace Flamarkt\Core\Api\Serializer;

use Flamarkt\Core\Order\Order;
use Flarum\Api\Serializer\AbstractSerializer;
use Flarum\Api\Serializer\BasicUserSerializer;
use Tobscure\JsonApi\Relationship;

class OrderSerializer extends AbstractSerializer
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
            'createdAt' => $this->formatDate($order->created_at),
        ];
    }

    public function user(Order $order): ?Relationship
    {
        return $this->hasOne($order, BasicUserSerializer::class);
    }

    public function lines(Order $order): ?Relationship
    {
        return $this->hasMany($order, OrderLineSerializer::class);
    }

    public function payments(Order $order): ?Relationship
    {
        return $this->hasMany($order, OrderLineSerializer::class);
    }
}
