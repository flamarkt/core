<?php

namespace Flamarkt\Core\Api\Controller;

use Flamarkt\Core\Api\Serializer\PaymentSerializer;
use Flamarkt\Core\Order\OrderRepository;
use Flamarkt\Core\Payment\PaymentRepository;
use Flarum\Api\Controller\AbstractShowController;
use Flarum\Http\RequestUtil;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class PaymentStoreController extends AbstractShowController
{
    public $serializer = PaymentSerializer::class;

    public function __construct(
        protected OrderRepository   $orderRepository,
        protected PaymentRepository $paymentRepository
    )
    {
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);

        $order = $this->orderRepository->findUidOrFail(Arr::get($request->getQueryParams(), 'id'), $actor);

        return $this->paymentRepository->store($order, $actor, (array)Arr::get($request->getParsedBody(), 'data'));
    }
}
