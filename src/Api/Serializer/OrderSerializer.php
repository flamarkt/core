<?php

namespace Flamarkt\Core\Api\Serializer;

use Flamarkt\Core\Order\Order;
use Flarum\Api\Serializer\BasicUserSerializer;
use Tobscure\JsonApi\Relationship;

class OrderSerializer extends BasicOrderSerializer
{
    /**
     * @param Order $order
     * @return array
     */
    protected function getDefaultAttributes($order): array
    {
        $attributes = parent::getDefaultAttributes($order) + [
                'priceTotal' => $order->price_total,
                'paidAmount' => $order->paid_amount,
                'productCount' => $order->product_count,
                'createdAt' => $this->formatDate($order->created_at),
            ];

        if ($order->hidden_at) {
            $attributes['isHidden'] = true;

            if ($this->actor->can('backoffice')) {
                $attributes['hiddenAt'] = $this->formatDate($order->hidden_at);
            }
        }

        return $attributes;
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
        return $this->hasMany($order, PaymentSerializer::class);
    }
}
