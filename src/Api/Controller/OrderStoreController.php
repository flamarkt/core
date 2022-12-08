<?php

namespace Flamarkt\Core\Api\Controller;

use Flamarkt\Core\Api\Serializer\OrderSerializer;
use Flamarkt\Core\Cart\CartRepository;
use Flamarkt\Core\Order\OrderBuilderFactory;
use Flamarkt\Core\Order\OrderRepository;
use Flarum\Api\Controller\AbstractCreateController;
use Flarum\Http\RequestUtil;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class OrderStoreController extends AbstractCreateController
{
    public $serializer = OrderSerializer::class;

    public $include = [
        'user',
        'lines.product',
        'payments',
    ];

    public function __construct(
        protected OrderRepository     $orderRepository,
        protected CartRepository      $cartRepository,
        protected OrderBuilderFactory $orderBuilder
    )
    {
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $data = (array)Arr::get($request->getParsedBody(), 'data');

        $cartId = Arr::get($data, 'relationships.cart.data.id');

        if ($cartId) {
            $cart = $this->cartRepository->findUidOrFail($cartId, $actor);

            return $this->orderBuilder->build($actor, $cart, $data, $request);
        }

        // If no cart ID was passed, continue to manual admin order creation
        return $this->orderRepository->store($actor, $data);
    }
}
