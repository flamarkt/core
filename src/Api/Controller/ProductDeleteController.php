<?php

namespace Flamarkt\Core\Api\Controller;

use Flamarkt\Core\Product\ProductRepository;
use Flarum\Api\Controller\AbstractDeleteController;
use Flarum\Http\RequestUtil;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;

class ProductDeleteController extends AbstractDeleteController
{
    public function __construct(
        protected ProductRepository $repository
    )
    {
    }

    protected function delete(ServerRequestInterface $request)
    {
        $actor = RequestUtil::getActor($request);

        $product = $this->repository->findUidOrFail(Arr::get($request->getQueryParams(), 'id'), $actor);

        $this->repository->delete($product, $actor, (array)Arr::get($request->getParsedBody(), 'data'));
    }
}
