<?php

namespace Flamarkt\Core\Product\Event;

use Flamarkt\Core\Product\Product;
use Flarum\User\User;

class Renamed
{
    public $product;
    public $oldTitle;
    public $actor;

    public function __construct(Product $product, $oldTitle, User $actor = null)
    {
        $this->product = $product;
        $this->oldTitle = $oldTitle;
        $this->actor = $actor;
    }
}
