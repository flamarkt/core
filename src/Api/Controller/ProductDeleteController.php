<?php

namespace Flamarkt\Core\Api\Controller;

use Flamarkt\Core\Product\ProductRepository;
use Flarum\Api\Controller\AbstractDeleteController;
use Flarum\Http\RequestUtil;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;

class ProductDeleteController extends AbstractDeleteController
{
    protected $repository;

    public function __construct(ProductRepository $repository)
    {
        $this->repository = $repository;
    }

    protected function delete(ServerRequestInterface $request)
    {
        $actor = RequestUtil::getActor($request);

        $product = $this->repository->findOrFail(Arr::get($request->getQueryParams(), 'id'), $actor);

        $this->repository->delete($product, $actor);
    }
}
