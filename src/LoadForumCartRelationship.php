<?php

namespace Flamarkt\Core;

use Flamarkt\Core\Cart\CartRepository;
use Flarum\Api\Controller\ShowForumController;
use Flarum\Http\RequestUtil;
use Illuminate\Contracts\Session\Session;
use Psr\Http\Message\ServerRequestInterface;

class LoadForumCartRelationship
{
    protected $repository;

    public function __construct(CartRepository $repository)
    {
        $this->repository = $repository;
    }

    public function __invoke(ShowForumController $controller, &$data, ServerRequestInterface $request)
    {
        //TODO: app fails to load when returning null here
        $data['cart'] = $request->getAttribute('cart');
    }
}
