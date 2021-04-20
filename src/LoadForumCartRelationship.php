<?php

namespace Flamarkt\Core;

use Flamarkt\Core\Cart\CartRepository;
use Flarum\Api\Controller\ShowForumController;
use Flarum\User\User;
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
        /**
         * @var User $actor
         */
        $actor = $request->getAttribute('actor');

        //TODO: that's a workaround the fact middlewares don't run in preload and therefore the cart request attribute isn't present
        // https://github.com/flarum/core/issues/2800
        $session = $actor->getSession();

        $cartId = $session->get('cart_id');

        $data['cart'] = $cartId ? $this->repository->find($cartId, $actor) : null;
    }
}
