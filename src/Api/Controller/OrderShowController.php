<?php

namespace Flamarkt\Core\Api\Controller;

use Flamarkt\Core\Api\Serializer\OrderSerializer;
use Flamarkt\Core\Order\Order;
use Flamarkt\Core\Order\OrderRepository;
use Flarum\Api\Controller\AbstractShowController;
use Flarum\Http\RequestUtil;
use Flarum\Http\SlugManager;
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

    protected $slugManager;
    protected $repository;

    public function __construct(SlugManager $slugManager, OrderRepository $repository)
    {
        $this->slugManager = $slugManager;
        $this->repository = $repository;
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $id = Arr::get($request->getQueryParams(), 'id');
        $actor = RequestUtil::getActor($request);

        if (Arr::get($request->getQueryParams(), 'bySlug')) {
            return $this->slugManager->forResource(Order::class)->fromSlug($id, $actor);
        } else {
            return $this->repository->findUidOrFail($id, $actor);
        }
    }
}
