<?php

namespace Flamarkt\Core\Api\Controller;

use Flamarkt\Core\Payment\PaymentRepository;
use Flarum\Api\Controller\AbstractDeleteController;
use Flarum\Http\RequestUtil;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;

class PaymentDeleteController extends AbstractDeleteController
{
    protected $repository;

    public function __construct(PaymentRepository $repository)
    {
        $this->repository = $repository;
    }

    protected function delete(ServerRequestInterface $request)
    {
        $actor = RequestUtil::getActor($request);

        $payment = $this->repository->findUidOrFail(Arr::get($request->getQueryParams(), 'id'), $actor);

        $this->repository->delete($payment, $actor);
    }
}
