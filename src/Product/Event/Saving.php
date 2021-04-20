<?php

namespace Flamarkt\Core\Product\Event;

use Flamarkt\Core\Product\Product;
use Flarum\User\User;

class Saving
{
    public $product;
    public $actor;
    public $data;

    public function __construct(Product $product, User $actor, array $data = [])
    {
        $this->product = $product;
        $this->actor = $actor;
        $this->data = $data;
    }
}
