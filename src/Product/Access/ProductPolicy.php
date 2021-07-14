<?php

namespace Flamarkt\Core\Product\Access;

use Flamarkt\Core\Product\Product;
use Flarum\User\Access\AbstractPolicy;
use Flarum\User\User;

class ProductPolicy extends AbstractPolicy
{
    public function order(User $actor, Product $product)
    {
        return $actor->hasPermission('flamarkt.shop');
    }
}
