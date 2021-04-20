<?php

namespace Flamarkt\Core\Api\Controller;

use Flamarkt\Core\Product\ProductRepository;
use Flarum\Api\Controller\AbstractDeleteController;
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
        $actor = $request->getAttribute('actor');

        $product = $this->repository->findOrFail(Arr::get($request->getQueryParams(), 'id'), $actor);

        $this->repository->delete($product, $actor);
    }
}
