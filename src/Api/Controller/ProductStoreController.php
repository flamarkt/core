<?php

namespace Flamarkt\Core\Api\Controller;

use Flamarkt\Core\Api\Serializer\ProductSerializer;
use Flamarkt\Core\Product\ProductRepository;
use Flarum\Api\Controller\AbstractCreateController;
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
        return $this->repository->store($request->getAttribute('actor'), $request->getParsedBody());
    }
}
