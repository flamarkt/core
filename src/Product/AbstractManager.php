<?php

namespace Flamarkt\Core\Product;

use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\User\User;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;

abstract class AbstractManager
{
    public function __construct(
        protected array                       $drivers,
        protected array                       $filters,
        protected SettingsRepositoryInterface $settings
    )
    {
    }

    protected function process(Product $product, User $actor, ServerRequestInterface $request = null): array
    {
        $driverName = $this->driver($product, $actor, $request);

        $driverCallback = Arr::get($this->drivers, $driverName);

        if (!is_callable($driverCallback)) {
            throw new \Exception("Invalid callback for driver $driverName");
        }

        $results = [
            $this->sanitize($driverCallback($product, $actor, $request)),
        ];

        $filters = array_merge(
            Arr::get($this->filters, $driverName) ?? [],
            Arr::get($this->filters, '*') ?? []
        );

        foreach ($filters as $callback) {
            $results[] = $this->sanitize($callback($product, $actor, $request));
        }

        return $results;
    }

    abstract function driver(Product $product, User $actor, ServerRequestInterface $request = null): string;

    protected function sanitize($result)
    {
        return $result;
    }
}
