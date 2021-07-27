<?php

namespace Flamarkt\Core\Product;

use Flarum\User\User;
use Psr\Http\Message\ServerRequestInterface;

class AvailabilityManager extends AbstractManager
{
    public const AVAILABLE = 'AVAILABLE';
    public const UNAVAILABLE = 'UNAVAILABLE';
    public const FORCE_AVAILABLE = 'FORCE_AVAILABLE';
    public const FORCE_UNAVAILABLE = 'FORCE_UNAVAILABLE';

    protected const EVALUATION_CRITERIA_PRIORITY = [
        self::FORCE_UNAVAILABLE => false,
        self::FORCE_AVAILABLE => true,
        self::UNAVAILABLE => false,
        self::AVAILABLE => true,
    ];

    public function driver(Product $product, User $actor, ServerRequestInterface $request = null): string
    {
        return $product->availability_driver ?? $this->settings->get('flamarkt.defautAvailabilityDriver') ?: 'never';
    }

    protected function sanitize($result)
    {
        if ($result === true) {
            return self::AVAILABLE;
        }

        if ($result === false) {
            return self::UNAVAILABLE;
        }

        return $result;
    }

    public function availability(Product $product, User $actor, ServerRequestInterface $request = null): bool
    {
        $results = $this->process($product, $actor, $request);

        foreach (static::EVALUATION_CRITERIA_PRIORITY as $criteria => $decision) {
            if (in_array($criteria, $results, true)) {
                return $decision;
            }
        }

        return false;
    }

    public function canOrder(Product $product, User $actor, ServerRequestInterface $request = null): bool
    {
        if ($actor->can('orderAlways', $product)) {
            return true;
        }

        return $actor->can('orderWhenAvailable', $product) && $this->availability($product, $actor, $request);
    }
}
