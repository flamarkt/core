<?php

namespace Flamarkt\Core\Order;

use Flarum\Foundation\AbstractServiceProvider;

class OrderServiceProvider extends AbstractServiceProvider
{
    public function register()
    {
        $this->container->instance('flamarkt.order.groups', [
            'products',
            'shipping',
        ]);

        // Workaround for https://github.com/flarum/core/issues/2712
        $this->container->extend('flarum.simple_search.fulltext_gambits', function ($oldFulltextGambits) {
            $oldFulltextGambits[OrderSearcher::class] = Gambit\FullTextGambit::class;

            return $oldFulltextGambits;
        });
    }
}
