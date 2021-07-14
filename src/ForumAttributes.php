<?php

namespace Flamarkt\Core;

use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Foundation\Config;
use Flarum\Http\UrlGenerator;
use Flarum\Settings\SettingsRepositoryInterface;

class ForumAttributes
{
    protected $config;
    protected $settings;
    protected $url;

    public function __construct(Config $config, SettingsRepositoryInterface $settings, UrlGenerator $url)
    {
        $this->config = $config;
        $this->settings = $settings;
        $this->url = $url;
    }

    public function __invoke(ForumSerializer $serializer): array
    {
        $attributes = [
            'priceDecimals' => 2,
            'priceUnit' => 'CHF',
        ];

        if ($serializer->getActor()->can('backoffice')) {
            $attributes += [
                'backofficeUrl' => $this->url->to('backoffice')->base(),
                'flamarktAvailabilityDrivers' => array_keys(resolve('flamarkt.availability_drivers')),
                'flamarktPriceDrivers' => array_keys(resolve('flamarkt.price_drivers')),
            ];
        }

        return $attributes;
    }
}
