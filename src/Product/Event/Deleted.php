<?php

namespace Flamarkt\Core\Product\Event;

use Flamarkt\Core\Product\Product;
use Flarum\User\User;

class Deleted
{
    public function __construct(
        public Product $product,
        public ?User   $actor = null
    )
    {
    }
}
