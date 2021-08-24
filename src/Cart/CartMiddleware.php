<?php

namespace Flamarkt\Core\Cart;

use Flarum\Http\RequestUtil;
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

        $actor = RequestUtil::getActor($request);

        if ($actor->isGuest()) {
            // TODO: allow guests
            return $handler->handle($request);
        }

        $cartUid = $session->get('cart_uid');

        if ($cartUid) {
            $cart = $this->repository->findUid($cartUid, $actor);

            if ($cart && !$cart->alreadySubmitted) {
                return $handler->handle($request->withAttribute('cart', $cart));
            }
        }

        $cart = $this->repository->store($actor);

        $session->put('cart_uid', $cart->uid);

        return $handler->handle($request->withAttribute('cart', $cart));
    }
}
