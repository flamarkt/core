<?php

namespace Flamarkt\Core\Api\Controller;

use Flamarkt\Core\Api\Serializer\OrderSerializer;
use Flamarkt\Core\Order\Order;
use Flamarkt\Core\Order\OrderRepository;
use Flarum\Api\Controller\AbstractShowController;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class OrderShowController extends AbstractShowController
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
        return $this->repository->findOrFail(Arr::get($request->getQueryParams(), 'id'), $request->getAttribute('actor'));
    }
}
