<?php

namespace Flamarkt\Core\Product;

use Flamarkt\Core\Product\Contract\PriceDriverInterface;
use Flarum\User\User;
use Psr\Http\Message\ServerRequestInterface;

class PriceDriver implements PriceDriverInterface
{
    public function __invoke(Product $product, User $actor, ServerRequestInterface $request = null): ?int
    {
        return $product->price;
    }
}
