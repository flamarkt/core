<?php

namespace Flamarkt\Core\Product\Contract;

use Flamarkt\Core\Product\Product;
use Flarum\User\User;
use Psr\Http\Message\ServerRequestInterface;

interface PriceDriverInterface
{
    public function __invoke(Product $product, User $actor, ServerRequestInterface $request = null);
}
