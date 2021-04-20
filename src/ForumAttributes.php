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
        return [
            //TODO: condition to see
            'backofficeUrl' => $this->url->to('backoffice')->base(),
            'priceDecimals' => 2,
            'priceUnit' => 'CHF',
        ];
    }
}
