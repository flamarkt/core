<?php

namespace Flamarkt\Core\Cart;

class GuestCart extends Cart
{
    public $id = 0;
    public $uid = 'guest';
    public $product_count = 0;
    public $price_total = 0;

    // TODO: hard-code relationship data to prevent useless SQL query to retrieve products
}
