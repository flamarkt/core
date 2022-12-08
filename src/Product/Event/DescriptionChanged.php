<?php

namespace Flamarkt\Core\Product\Event;

use Flamarkt\Core\Product\Product;
use Flarum\User\User;

class DescriptionChanged
{
    public function __construct(
        public Product $product,
        public ?string $oldDescription,
        public ?User   $actor = null
    )
    {
    }
}
