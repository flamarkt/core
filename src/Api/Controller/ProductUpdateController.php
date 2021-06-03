<?php

namespace Flamarkt\Core\Api\Controller;

use Flamarkt\Core\Api\Serializer\ProductSerializer;
use Flamarkt\Core\Product\Product;
use Flamarkt\Core\Product\ProductRepository;
use Flarum\Api\Controller\AbstractShowController;
use Flarum\Http\RequestUtil;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class ProductUpdateController extends AbstractShowController
{
    public $serializer = ProductSerializer::class;

    protected $repository;

    public function __construct(ProductRepository $repository)
    {
        $this->repository = $repository;
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $cart = $request->getAttribute('cart');

        $product = $this->repository->findOrFail(Arr::get($request->getQueryParams(), 'id'), $actor);

        $product = $this->repository->update($product, $actor, $request->getParsedBody(), $cart);

        Product::setStateCart($cart);

        return $product;
    }
}
