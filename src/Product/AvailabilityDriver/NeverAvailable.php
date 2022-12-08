<?php

namespace Flamarkt\Core\Product\AvailabilityDriver;

use Flamarkt\Core\Product\AvailabilityManager;
use Flamarkt\Core\Product\Contract\AvailabilityDriverInterface;
use Flamarkt\Core\Product\Product;
use Flarum\User\User;
use Psr\Http\Message\ServerRequestInterface;

/**
 * Product will stay visible like normal but never be available for order.
 * Class can't be called "Never" for PHP 8.1 compatibility.
 */
class NeverAvailable implements AvailabilityDriverInterface
{
    public function __invoke(Product $product, User $actor, ServerRequestInterface $request = null): string
    {
        return AvailabilityManager::UNAVAILABLE;
    }
}
