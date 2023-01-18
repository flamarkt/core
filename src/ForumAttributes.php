<?php

namespace Flamarkt\Core;

use Flarum\Api\Serializer\ForumSerializer;

class ForumAttributes
{
    public function __invoke(ForumSerializer $serializer): array
    {
        $attributes = [
            'priceDecimals' => 2,
            'priceUnit' => 'CHF',
            'flamarktCanBrowse' => $serializer->getActor()->hasPermission('flamarkt.browse'),
        ];

        if ($serializer->getActor()->can('backoffice')) {
            $attributes += [
                'flamarktAvailabilityDrivers' => array_keys(resolve('flamarkt.availability_drivers')),
                'flamarktPriceDrivers' => array_keys(resolve('flamarkt.price_drivers')),
            ];
        }

        return $attributes;
    }
}
