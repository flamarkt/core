<?php

namespace Flamarkt\Core\Api\Controller;

use Flamarkt\Core\Api\Serializer\CartSerializer;
use Flamarkt\Core\Cart\Cart;
use Flamarkt\Core\Product\Product;
use Flarum\Api\Controller\AbstractShowController;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class CartSessionController extends AbstractShowController
{
    public $serializer = CartSerializer::class;

    public $include = [
        'products',
    ];

    protected function data(ServerRequestInterface $request, Document $document)
    {
        /**
         * @var Cart $cart
         */
        $cart = $request->getAttribute('cart');

        Product::setStateUser($request->getAttribute('actor'));
        Product::setStateCart($cart);

        $cart->load([
            'products.cartState',
            'products.userState',
        ]);

        return $cart;
    }
}
