<?php

namespace Flamarkt\Core;

use Flamarkt\Core\Cart\CartRepository;
use Flarum\Api\Controller\ShowForumController;
use Psr\Http\Message\ServerRequestInterface;

class LoadForumCartRelationship
{
    public function __construct(
        protected CartRepository $repository
    )
    {
    }

    public function __invoke(ShowForumController $controller, &$data, ServerRequestInterface $request): void
    {
        //TODO: app fails to load when returning null here
        $data['cart'] = $request->getAttribute('cart');
    }
}
