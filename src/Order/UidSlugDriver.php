<?php

namespace Flamarkt\Core\Order;

use Flarum\Database\AbstractModel;
use Flarum\Http\SlugDriverInterface;
use Flarum\User\User;

class UidSlugDriver implements SlugDriverInterface
{
    protected $orders;

    public function __construct(OrderRepository $orders)
    {
        $this->orders = $orders;
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
