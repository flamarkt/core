<?php

namespace Flamarkt\Core\Product\Event;

use Flamarkt\Core\Product\Product;
use Flarum\User\User;

class Renamed
{
    public function __construct(
        public Product $product,
        public ?string $oldTitle,
        public ?User   $actor = null
    )
    {
    }
}
