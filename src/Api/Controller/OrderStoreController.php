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

    protected $orderRepository;
    protected $cartRepository;
    protected $orderBuilder;

    public function __construct(OrderRepository $orderRepository, CartRepository $cartRepository, OrderBuilderFactory $orderBuilder)
    {
        $this->orderRepository = $orderRepository;
        $this->cartRepository = $cartRepository;
        $this->orderBuilder = $orderBuilder;
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $data = $request->getParsedBody();

        $cartId = Arr::get($data, 'data.relationships.cart.data.id');

        if ($cartId) {
            $cart = $this->cartRepository->findUidOrFail($cartId, $actor);

            return $this->orderBuilder->build($actor, $cart, $data, $request);
        }

        return $this->orderRepository->store($actor, $data);
    }
}
