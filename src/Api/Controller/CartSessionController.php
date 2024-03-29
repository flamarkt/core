<?php

namespace Flamarkt\Core\Api\Controller;

use Flamarkt\Core\Api\Serializer\CartSerializer;
use Flamarkt\Core\Cart\Cart;
use Flamarkt\Core\Cart\GuestCart;
use Flamarkt\Core\Product\Product;
use Flarum\Api\Controller\AbstractShowController;
use Flarum\Http\RequestUtil;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class CartSessionController extends AbstractShowController
{
    public $serializer = CartSerializer::class;

    public $include = [
        'products',
    ];

    protected function data(ServerRequestInterface $request, Document $document): Cart
    {
        /**
         * @var Cart $cart
         */
        $cart = $request->getAttribute('cart');

        // Right now guests might not have a cart, so we'll throw an error
        // In the future it would be ideal for a cart to always exist
        if (!$cart) {
            return new GuestCart();
        }

        Product::setStateUser(RequestUtil::getActor($request));
        Product::setStateCart($cart);

        $cart->load([
            'products.cartState',
            'products.userState',
        ]);

        return $cart;
    }
}
