<?php

namespace Flamarkt\Core\Api\Controller;

use Flamarkt\Core\Api\Serializer\ProductSerializer;
use Flamarkt\Core\Product\Product;
use Flamarkt\Core\Product\ProductRepository;
use Flarum\Api\Controller\AbstractShowController;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class ProductShowController extends AbstractShowController
{
    public $serializer = ProductSerializer::class;

    protected $repository;

    public function __construct(ProductRepository $repository)
    {
        $this->repository = $repository;
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = $request->getAttribute('actor');

        $product = $this->repository->findOrFail(Arr::get($request->getQueryParams(), 'id'), $actor);

        Product::setStateCart($request->getAttribute('cart'));

        return $product;
    }
}
