<?php

namespace Flamarkt\Core\Backoffice\Middleware;

use Flarum\Http\RequestUtil;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;

class RequireManagerAbility implements MiddlewareInterface
{
    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        RequestUtil::getActor($request)->assertCan('backoffice');

        return $handler->handle($request);
    }
}
