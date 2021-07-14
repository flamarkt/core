<?php

namespace Flamarkt\Core\Product;

use Flamarkt\Core\Product\AvailabilityDriver\Always;
use Flamarkt\Core\Product\AvailabilityDriver\Never;
use Flarum\Foundation\AbstractServiceProvider;

class ProductServiceProvider extends AbstractServiceProvider
{
    public function register()
    {
        $this->container->instance('flamarkt.availability_drivers', [
            'always' => new Always,
            'never' => new Never,
        ]);
        $this->container->instance('flamarkt.availability_driver_filters', []);

        $this->container->singleton(AvailabilityManager::class);
        $this->container->when(AvailabilityManager::class)
            ->needs('$drivers')
            ->give(function (): array {
                return $this->container->make('flamarkt.availability_drivers');
            });
        $this->container->when(AvailabilityManager::class)
            ->needs('$filters')
            ->give(function (): array {
                return $this->container->make('flamarkt.availability_driver_filters');
            });

        $this->container->instance('flamarkt.price_drivers', [
            'fixed' => new PriceDriver,
        ]);
        $this->container->instance('flamarkt.price_driver_filters', []);

        $this->container->singleton(PriceManager::class);
        $this->container->when(PriceManager::class)
            ->needs('$drivers')
            ->give(function (): array {
                return $this->container->make('flamarkt.price_drivers');
            });
        $this->container->when(PriceManager::class)
            ->needs('$filters')
            ->give(function (): array {
                return $this->container->make('flamarkt.price_driver_filters');
            });
    }

    public function boot()
    {
        Product::setFormatter($this->container->make('flarum.formatter'));
    }
}
