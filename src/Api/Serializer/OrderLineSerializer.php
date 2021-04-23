<?php

namespace Flamarkt\Core\Api\Serializer;

use Flamarkt\Core\Order\OrderLine;
use Flarum\Api\Serializer\AbstractSerializer;
use Tobscure\JsonApi\Relationship;

class OrderLineSerializer extends AbstractSerializer
{
    protected $type = 'flamarkt-order-lines';

    /**
     * @param OrderLine $line
     * @return array
     */
    protected function getDefaultAttributes($line): array
    {
        return [
            'number' => $line->number,
            'group' => $line->group,
            'type' => $line->type,
            'label' => $line->label,
            'comment' => $line->comment,
            'quantity' => $line->quantity,
            'priceUnit' => $line->price_unit,
            'priceTotal' => $line->price_total,
        ];
    }

    public function product(OrderLine $line): ?Relationship
    {
        return $this->hasOne($line, BasicProductSerializer::class);
    }
}
