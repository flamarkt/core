<?php

namespace Flamarkt\Core\Api\Controller;

use Flamarkt\Core\Order\OrderRepository;
use Flarum\Api\Controller\AbstractDeleteController;
use Flarum\Http\RequestUtil;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;

class OrderDeleteController extends AbstractDeleteController
{
    public function __construct(
        protected OrderRepository $repository
    )
    {
    }

    protected function delete(ServerRequestInterface $request)
    {
        $actor = RequestUtil::getActor($request);

        $order = $this->repository->findUidOrFail(Arr::get($request->getQueryParams(), 'id'), $actor);

        $this->repository->delete($order, $actor, (array)Arr::get($request->getParsedBody(), 'data'));
    }
}
