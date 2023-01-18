<?php

namespace Flamarkt\Core\Product;

use Flarum\Filter\AbstractFilterer;
use Flarum\User\User;
use Illuminate\Database\Eloquent\Builder;

class ProductFilterer extends AbstractFilterer
{
    public function __construct(
        array                       $filters,
        array                       $filterMutators,
        protected ProductRepository $repository
    )
    {
        parent::__construct($filters, $filterMutators);
    }

    protected function getQuery(User $actor): Builder
    {
        return $this->repository->visibleTo($actor, 'viewEnumerate');
    }
}
