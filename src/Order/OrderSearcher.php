<?php

namespace Flamarkt\Core\Order;

use Flarum\Search\AbstractSearcher;
use Flarum\Search\GambitManager;
use Flarum\User\User;
use Illuminate\Database\Eloquent\Builder;

class OrderSearcher extends AbstractSearcher
{
    public function __construct(
        GambitManager             $gambits,
        array                     $searchMutators,
        protected OrderRepository $repository
    )
    {
        parent::__construct($gambits, $searchMutators);
    }

    protected function getQuery(User $actor): Builder
    {
        return $this->repository->visibleTo($actor, 'viewEnumerate');
    }
}
