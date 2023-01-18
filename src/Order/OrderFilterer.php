<?php

namespace Flamarkt\Core\Order;

use Flarum\Filter\AbstractFilterer;
use Flarum\User\User;
use Illuminate\Database\Eloquent\Builder;

class OrderFilterer extends AbstractFilterer
{
    public function __construct(
        array                     $filters,
        array                     $filterMutators,
        protected OrderRepository $repository
    )
    {
        parent::__construct($filters, $filterMutators);
    }

    protected function getQuery(User $actor): Builder
    {
        return $this->repository->visibleTo($actor, 'viewEnumerate');
    }
}
