<?php

namespace Flamarkt\Core\Product;

use Flarum\Foundation\AbstractServiceProvider;

class ProductServiceProvider extends AbstractServiceProvider
{
    public function boot()
    {
        Product::setFormatter($this->container->make('flarum.formatter'));
    }
}
