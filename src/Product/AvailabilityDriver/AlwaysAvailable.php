<?php

namespace Flamarkt\Core\Product\AvailabilityDriver;

use Flamarkt\Core\Product\AvailabilityManager;
use Flamarkt\Core\Product\Contract\AvailabilityDriverInterface;
use Flamarkt\Core\Product\Product;
use Flarum\User\User;
use Psr\Http\Message\ServerRequestInterface;

class AlwaysAvailable implements AvailabilityDriverInterface
{
    public function __invoke(Product $product, User $actor, ServerRequestInterface $request = null): string
    {
        return AvailabilityManager::AVAILABLE;
    }
}
