<?php

namespace Flamarkt\Core\Product\Event;

use Flamarkt\Core\Product\Product;
use Flarum\User\User;

class Deleting
{
    public function __construct(
        public Product $product,
        public User    $actor,
        public array   $data = []
    )
    {
    }
}
