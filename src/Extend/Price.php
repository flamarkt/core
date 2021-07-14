<?php

namespace Flamarkt\Core\Extend;

use Flarum\Extend\ExtenderInterface;
use Flarum\Extension\Extension;
use Illuminate\Contracts\Container\Container;

class Price implements ExtenderInterface
{
    protected $drivers = [];
    protected $filters = [];

    public function driver(string $name, string $className): self
    {
        $this->drivers[$name] = $className;

        return $this;
    }

    public function driverFilter(string $name, $callback): self
    {
        $this->filters[$name][] = $callback;

        return $this;
    }

    public function globalFilter($callback): self
    {
        $this->filters['*'][] = $callback;

        return $this;
    }

    public function extend(Container $container, Extension $extension = null)
    {
        if (count($this->drivers)) {
            $container->extend('flamarkt.price_drivers', function (array $drivers): array {
                return array_merge($drivers, $this->drivers);
            });
        }

        if (count($this->filters)) {
            $container->extend('flamarkt.price_driver_filters', function (array $filters): array {
                foreach ($this->filters as $key => $keyFilters) {
                    foreach ($keyFilters as $filter) {
                        $filters[$key][] = $filter;
                    }
                }

                return $filters;
            });
        }
    }
}
