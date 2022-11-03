<?php

namespace Flamarkt\Core\Api\Controller;

use Flamarkt\Core\Api\Serializer\PaymentSerializer;
use Flamarkt\Core\Payment\PaymentRepository;
use Flarum\Api\Controller\AbstractShowController;
use Flarum\Http\RequestUtil;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class PaymentUpdateController extends AbstractShowController
{
    public $serializer = PaymentSerializer::class;

    protected $repository;

    public function __construct(PaymentRepository $repository)
    {
        $this->repository = $repository;
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);

        $payment = $this->repository->findUidOrFail(Arr::get($request->getQueryParams(), 'id'), $actor);

        return $this->repository->update($payment, $actor, (array)Arr::get($request->getParsedBody(), 'data'));
    }
}
