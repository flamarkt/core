<?php

namespace Flamarkt\Core\Api\Controller;

use Flamarkt\Core\Api\Serializer\ProductSerializer;
use Flamarkt\Core\Product\ProductRepository;
use Flarum\Api\Controller\AbstractCreateController;
use Flarum\Http\RequestUtil;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class ProductStoreController extends AbstractCreateController
{
    public $serializer = ProductSerializer::class;

    protected $repository;

    public function __construct(ProductRepository $repository)
    {
        $this->repository = $repository;
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        return $this->repository->store(RequestUtil::getActor($request), (array)Arr::get($request->getParsedBody(), 'data'));
    }
}
