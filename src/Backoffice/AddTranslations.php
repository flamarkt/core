<?php

namespace Flamarkt\Core\Backoffice;

use Flarum\Frontend\Assets;
use Flarum\Frontend\Compiler\Source\SourceCollector;
use Illuminate\Support\Arr;

/**
 * Same as Flarum's original class, but with custom app reference
 */
class AddTranslations extends \Flarum\Frontend\AddTranslations
{
    public function to(Assets $assets)
    {
        $assets->localeJs(function (SourceCollector $sources, string $locale) {
            $sources->addString(function () use ($locale) {
                $translations = $this->getTranslations($locale);

                return "flarum.extensions['flamarkt-core'].app.translator.addTranslations(" . json_encode($translations) . ')';
            });
        });
    }

    protected function getTranslations(string $locale): array
    {
        $catalogue = $this->locales->getTranslator()->getCatalogue($locale);
        $translations = $catalogue->all('messages');

        while ($catalogue = $catalogue->getFallbackCatalogue()) {
            $translations = array_replace($catalogue->all('messages'), $translations);
        }

        return Arr::only(
            $translations,
            array_filter(array_keys($translations), $this->filter)
        );
    }
}
