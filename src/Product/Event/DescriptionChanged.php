<?php

namespace Flamarkt\Core\Product\Event;

use Flamarkt\Core\Product\Product;
use Flarum\User\User;

class DescriptionChanged
{
    public $product;
    public $oldDescription;
    public $actor;

    public function __construct(Product $product, $oldDescription, User $actor = null)
    {
        $this->product = $product;
        $this->oldDescription = $oldDescription;
        $this->actor = $actor;
    }
}
