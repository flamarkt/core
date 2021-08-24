<?php

namespace Flamarkt\Core\Product;

use Flarum\Database\AbstractModel;
use Flarum\Http\SlugDriverInterface;
use Flarum\User\User;

class UidSlugDriver implements SlugDriverInterface
{
    protected $products;

    public function __construct(ProductRepository $products)
    {
        $this->products = $products;
    }

    /**
     * @param Product $instance
     * @return string
     */
    public function toSlug(AbstractModel $instance): string
    {
        return $instance->uid;
    }

    public function fromSlug(string $slug, User $actor): AbstractModel
    {
        return $this->products->findUidOrFail($slug, $actor);
    }
}
