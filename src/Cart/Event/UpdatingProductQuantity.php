<?php

namespace Flamarkt\Core\Cart\Event;

use Flamarkt\Core\Cart\Cart;
use Flamarkt\Core\Product\Product;
use Flarum\User\User;

class UpdatingProductQuantity
{
    public function __construct(
        public Cart    $cart,
        public Product $product,
        public User    $actor,
        public int     $previousQuantity,
        public int     $newQuantity,
        public array   $data = []
    )
    {
    }
}
