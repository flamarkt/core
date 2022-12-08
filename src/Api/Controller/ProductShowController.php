<?php

namespace Flamarkt\Core\Api\Controller;

use Flamarkt\Core\Api\Serializer\ProductSerializer;
use Flamarkt\Core\Product\Product;
use Flamarkt\Core\Product\ProductRepository;
use Flarum\Api\Controller\AbstractShowController;
use Flarum\Http\RequestUtil;
use Flarum\Http\SlugManager;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class ProductShowController extends AbstractShowController
{
    public $serializer = ProductSerializer::class;

    public function __construct(
        protected SlugManager       $slugManager,
        protected ProductRepository $repository
    )
    {
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $id = Arr::get($request->getQueryParams(), 'id');
        $actor = RequestUtil::getActor($request);

        if (Arr::get($request->getQueryParams(), 'bySlug')) {
            $product = $this->slugManager->forResource(Product::class)->fromSlug($id, $actor);
        } else {
            $product = $this->repository->findUidOrFail($id, $actor);
        }

        Product::setStateCart($request->getAttribute('cart'));

        return $product;
    }
}
