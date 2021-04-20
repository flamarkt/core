<?php

namespace Flamarkt\Core\Order;

use Flarum\Search\AbstractSearcher;
use Flarum\Search\GambitManager;
use Flarum\User\User;
use Illuminate\Database\Eloquent\Builder;

class OrderSearcher extends AbstractSearcher
{
    protected $repository;

    public function __construct(GambitManager $gambits, array $searchMutators, OrderRepository $repository)
    {
        parent::__construct($gambits, $searchMutators);

        $this->repository = $repository;
    }

    protected function getQuery(User $actor): Builder
    {
        return $this->repository->visibleTo($actor);
    }
}
