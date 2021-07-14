<?php

namespace Flamarkt\Core\Product\Event;

use Flamarkt\Core\Product\Product;
use Flarum\User\User;

class Deleting
{
    public $product;
    public $actor;

    public function __construct(Product $product, User $actor)
    {
        $this->product = $product;
        $this->actor = $actor;
    }
}
