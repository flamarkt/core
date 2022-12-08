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

    public function __construct(
        protected ProductRepository $repository
    )
    {
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $cart = $request->getAttribute('cart');

        $product = $this->repository->findUidOrFail(Arr::get($request->getQueryParams(), 'id'), $actor);

        $product = $this->repository->update($product, $actor, (array)Arr::get($request->getParsedBody(), 'data'), $cart);

        Product::setStateCart($cart);

        return $product;
    }
}
