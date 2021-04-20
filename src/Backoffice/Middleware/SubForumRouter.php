<?php

namespace Flamarkt\Core\Backoffice\Middleware;

use Flarum\Foundation\Config;
use Illuminate\Contracts\Container\Container;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;

/**
 * While inside the forum frontend middleware stack, we will do a variation of the BasePathRouter used by Flarum
 * This code is based on the BasePathRouter router class and uses the same logic as Flarum to make the prefix customizable
 */
class SubForumRouter implements MiddlewareInterface
{
    protected $config;
    protected $container;

    public function __construct(Config $config, Container $container)
    {
        $this->config = $config;
        $this->container = $container;
    }

    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        $prefix = '/' . (Arr::get($this->config['paths'], 'flamarkt') ?? 'backoffice');

        if (Str::startsWith($request->getUri()->getPath(), $prefix)) {
            return $this->container->make('flarum.backoffice.handler')->handle($this->unprefixedRequest($request, $prefix));
        }

        return $handler->handle($request);
    }

    protected function unprefixedRequest(ServerRequestInterface $request, string $prefix): ServerRequestInterface
    {
        $uri = $request->getUri();

        return $request->withUri($uri->withPath('/' . ltrim(substr($uri->getPath(), strlen($prefix)), '/')));
    }
}
