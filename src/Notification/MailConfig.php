<?php

namespace Flamarkt\Core\Notification;

use Flarum\Foundation\Config;
use Flarum\Notification\Blueprint\BlueprintInterface;
use Flarum\Settings\SettingsRepositoryInterface;

class MailConfig
{
    public static string $templateView = 'flamarkt::email.template';

    public static $themeColorCallback;

    public static function themeColor(): string
    {
        if (self::$themeColorCallback) {
            return call_user_func(self::$themeColorCallback);
        }

        return resolve(SettingsRepositoryInterface::class)->get('theme_primary_color');
    }

    public static $brandCallback;

    public static function brand(): string
    {
        if (self::$brandCallback) {
            return call_user_func(self::$brandCallback);
        }

        $url = resolve(Config::class)->url();
        $title = resolve(SettingsRepositoryInterface::class)->get('forum_title');

        return '<a href="' . e($url) . '">' . e($title) . '</a>';
    }

    public static $cssCallbacks = [];

    public static function css(BlueprintInterface $blueprint = null): string
    {
        $allCss = [];

        foreach (self::$cssCallbacks as $callback) {
            $css = call_user_func($callback, $blueprint);

            if ($css) {
                $allCss[] = $css;
            }
        }

        return implode("\n\n", $allCss);
    }
}
