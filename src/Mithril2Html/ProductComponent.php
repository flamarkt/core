<?php

namespace Flamarkt\Core\Mithril2Html;

use ClarkWinkelmann\Mithril2Html\ComponentInterface;
use Flamarkt\Core\Product\Product;
use Flarum\User\User;

class ProductComponent implements ComponentInterface
{
    public function __construct(
        protected Product $product
    )
    {
    }

    public function route(): string
    {
        return 'flamarkt/product-summary';
    }

    public function preload(): ?string
    {
        return '/flamarkt/products/' . $this->product->uid;
    }

    public function actor(): ?User
    {
        return null;
    }

    public function selector(): ?string
    {
        return '#content';
    }
}
