<?php

namespace Flamarkt\Core\Api\Serializer;

use Flamarkt\Core\Order\Order;
use Flarum\Api\Serializer\AbstractSerializer;
use Flarum\Http\SlugManager;

class BasicOrderSerializer extends AbstractSerializer
{
    protected $type = 'flamarkt-orders';

    protected $slugManager;

    public function __construct(SlugManager $slugManager)
    {
        $this->slugManager = $slugManager;
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
