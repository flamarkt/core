<?php

namespace Flamarkt\Core\Api\Controller;

use Flamarkt\Core\Api\Serializer\CartSerializer;
use Flamarkt\Core\Cart\Cart;
use Flamarkt\Core\Cart\CartRepository;
use Flarum\Http\RequestUtil;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class CartUpdateController extends CartSessionController
{
    public $serializer = CartSerializer::class;

    public function __construct(
        protected CartRepository $repository
    )
    {
    }

    protected function data(ServerRequestInterface $request, Document $document): Cart
    {
        $actor = RequestUtil::getActor($request);

        $cart = $this->repository->findUidOrFail(Arr::get($request->getQueryParams(), 'id'), $actor);

        return $this->repository->update($cart, $actor, (array)Arr::get($request->getParsedBody(), 'data'));
    }
}
