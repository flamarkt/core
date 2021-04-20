<?php

namespace Flamarkt\Core\Cart;

use Flarum\User\User;
use Illuminate\Contracts\Session\Session;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;

class CartMiddleware implements MiddlewareInterface
{
    protected $repository;

    public function __construct(CartRepository $repository)
    {
        $this->repository = $repository;
    }

    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        /**
         * @var Session $session
         */
        $session = $request->getAttribute('session');

        /**
         * @var User $actor
         */
        $actor = $request->getAttribute('actor');

        if ($actor->isGuest()) {
            // TODO: allow guests
            return $handler->handle($request);
        }

        $cartId = $session->get('cart_id');

        if ($cartId && $cart = $this->repository->find($cartId, $actor)) {
            return $handler->handle($request->withAttribute('cart', $cart));
        }

        $cart = $this->repository->store($actor);

        $session->put('cart_id', $cart->id);

        return $handler->handle($request->withAttribute('cart', $cart));
    }
}
