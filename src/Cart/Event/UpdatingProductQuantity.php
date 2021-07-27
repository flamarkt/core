<?php

namespace Flamarkt\Core\Cart\Event;

use Flamarkt\Core\Cart\Cart;
use Flamarkt\Core\Product\Product;
use Flarum\User\User;

class UpdatingProductQuantity
{
    public $cart;
    public $product;
    public $actor;
    public $previousQuantity;
    public $newQuantity;
    public $data;

    public function __construct(Cart $cart, Product $product, User $actor, int $previousQuantity, int $newQuantity, array $data = [])
    {
        $this->cart = $cart;
        $this->product = $product;
        $this->actor = $actor;
        $this->previousQuantity = $previousQuantity;
        $this->newQuantity = $newQuantity;
        $this->data = $data;
    }
}
