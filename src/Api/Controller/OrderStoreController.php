<?php

namespace Flamarkt\Core\Api\Controller;

use Flamarkt\Core\Api\Serializer\OrderSerializer;
use Flamarkt\Core\Order\OrderRepository;
use Flarum\Api\Controller\AbstractCreateController;
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

    protected $repository;

    public function __construct(OrderRepository $repository)
    {
        $this->repository = $repository;
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        return $this->repository->store($request->getAttribute('actor'), $request->getParsedBody());
    }
}
