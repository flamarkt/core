<?php

namespace Flamarkt\Core\Product;

use Flarum\Foundation\AbstractServiceProvider;

class ProductServiceProvider extends AbstractServiceProvider
{
    public function register()
    {
        // Workaround for https://github.com/flarum/core/issues/2712
        $this->container->extend('flarum.simple_search.fulltext_gambits', function ($oldFulltextGambits) {
            $oldFulltextGambits[ProductSearcher::class] = Gambit\FullTextGambit::class;

            return $oldFulltextGambits;
        });
    }
}
