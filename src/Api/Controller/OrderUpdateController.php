<?php

namespace Flamarkt\Core\Api\Controller;

use Flamarkt\Core\Api\Serializer\OrderSerializer;
use Flamarkt\Core\Order\OrderRepository;
use Flarum\Api\Controller\AbstractShowController;
use Flarum\Http\RequestUtil;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class OrderUpdateController extends AbstractShowController
{
    public $serializer = OrderSerializer::class;

    public $include = [
        'user',
        'lines.product',
        'payments',
    ];

    protected $repository;

    public function __construct(OrderRepository $repository)
    {
        $this->repository = $repository;
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);

        $order = $this->repository->findUidOrFail(Arr::get($request->getQueryParams(), 'id'), $actor);

        return $this->repository->update($order, $actor, (array)Arr::get($request->getParsedBody(), 'data'));
    }
}
