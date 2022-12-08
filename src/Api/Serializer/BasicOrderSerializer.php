<?php

namespace Flamarkt\Core\Api\Serializer;

use Flamarkt\Core\Order\Order;
use Flarum\Api\Serializer\AbstractSerializer;
use Flarum\Http\SlugManager;

class BasicOrderSerializer extends AbstractSerializer
{
    use UidSerializerTrait;

    protected $type = 'flamarkt-orders';

    public function __construct(
        protected SlugManager $slugManager
    )
    {
    }

    /**
     * @param Order $order
     * @return array
     */
    protected function getDefaultAttributes($order): array
    {
        return [
            'number' => $order->id,
            'slug' => $this->slugManager->forResource(Order::class)->toSlug($order),
        ];
    }
}
