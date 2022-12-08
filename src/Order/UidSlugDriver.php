<?php

namespace Flamarkt\Core\Order;

use Flarum\Database\AbstractModel;
use Flarum\Http\SlugDriverInterface;
use Flarum\User\User;

class UidSlugDriver implements SlugDriverInterface
{
    public function __construct(
        protected OrderRepository $orders
    )
    {
    }

    /**
     * @param Order $instance
     * @return string
     */
    public function toSlug(AbstractModel $instance): string
    {
        return $instance->uid;
    }

    public function fromSlug(string $slug, User $actor): AbstractModel
    {
        return $this->orders->findUidOrFail($slug, $actor);
    }
}
