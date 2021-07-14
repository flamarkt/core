<?php

namespace Flamarkt\Core\Extend;

use Flarum\Extend\ExtenderInterface;
use Flarum\Extension\Extension;
use Flarum\Foundation\ContainerUtil;
use Illuminate\Contracts\Container\Container;

class Availability implements ExtenderInterface
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
            $container->extend('flamarkt.availability_drivers', function (array $drivers) use ($container): array {
                foreach ($this->drivers as $name => $driver) {
                    $drivers[$name] = ContainerUtil::wrapCallback($driver, $container);
                }

                return $drivers;
            });
        }

        if (count($this->filters)) {
            $container->extend('flamarkt.availability_driver_filters', function (array $filters) use ($container): array {
                foreach ($this->filters as $key => $keyFilters) {
                    foreach ($keyFilters as $filter) {
                        $filters[$key][] = ContainerUtil::wrapCallback($filter, $container);
                    }
                }

                return $filters;
            });
        }
    }
}
