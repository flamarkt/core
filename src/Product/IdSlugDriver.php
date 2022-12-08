<?php

namespace Flamarkt\Core\Product;

use Flarum\Database\AbstractModel;
use Flarum\Http\SlugDriverInterface;
use Flarum\User\User;

class IdSlugDriver implements SlugDriverInterface
{
    public function __construct(
        protected ProductRepository $products
    )
    {
    }

    /**
     * @param Product $instance
     * @return string
     */
    public function toSlug(AbstractModel $instance): string
    {
        return $instance->id;
    }

    public function fromSlug(string $slug, User $actor): AbstractModel
    {
        return $this->products->findIdOrFail($slug, $actor);
    }
}
