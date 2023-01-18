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
    public function __construct(
        protected CartRepository $repository
    )
    {
    }

    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        /**
         * @var Session $session
         */
        $session = $request->getAttribute('session');

        // Most of the time Flarum will run with a session, but requests to the mithril2html frontend will skip it
        // In that case we just ignore that part just like we do for guests
        if (!$session) {
            return $handler->handle($request);
        }

        $actor = RequestUtil::getActor($request);

        if ($actor->isGuest() || !$actor->hasPermission('flamarkt.cart')) {
            // TODO: allow guests. Currently disabled because there's no way to match which cart belongs to which guest
            return $handler->handle($request->withAttribute('cart', new GuestCart()));
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
