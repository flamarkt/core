<?php

namespace Flamarkt\Core\Backoffice;

use Flarum\Admin\Content\AdminPayload;
use Flarum\Extension\Event\Disabled;
use Flarum\Extension\Event\Enabled;
use Flarum\Formatter\Formatter;
use Flarum\Foundation\AbstractServiceProvider;
use Flarum\Foundation\Event\ClearingCache;
use Flarum\Foundation\Paths;
use Flarum\Frontend\AddLocaleAssets;
use Flarum\Frontend\Assets;
use Flarum\Frontend\Compiler\Source\SourceCollector;
use Flarum\Frontend\Document;
use Flarum\Frontend\Frontend;
use Flarum\Frontend\RecompileFrontendAssets;
use Flarum\Http\Middleware as HttpMiddleware;
use Flarum\Http\RouteCollection;
use Flarum\Http\RouteHandlerFactory;
use Flarum\Http\UrlGenerator;
use Flarum\Locale\LocaleManager;
use Flarum\Settings\Event\Saved;
use Flarum\Settings\SettingsRepositoryInterface;
use Laminas\Stratigility\MiddlewarePipe;
use Flarum\Frontend\Content as FrontendContent;

class BackofficeServiceProvider extends AbstractServiceProvider
{
    public function register()
    {
        $this->container->extend(UrlGenerator::class, function (UrlGenerator $url) {
            return $url->addCollection('backoffice', $this->container->make('flarum.backoffice.routes'), 'backoffice');
        });

        $this->container->singleton('flarum.backoffice.routes', function () {
            return new RouteCollection();
        });

        $this->container->afterResolving('flarum.backoffice.routes', function (RouteCollection $routes) {
            $this->setDefaultRoute($routes);
        });

        $this->container->singleton('flarum.backoffice.middleware', function () {
            return [
                // Our middleware stack doesn't need everything before route_resolver since we will re-use the forum stack
                // But everything after route_resolver needs to be copied here since it will be skipped when matching this frontend
                'flarum.backoffice.route_resolver',
                HttpMiddleware\CheckCsrfToken::class,
                HttpMiddleware\ShareErrorsFromSession::class,
            ];
        });

        $this->container->bind('flarum.backoffice.route_resolver', function () {
            return new HttpMiddleware\ResolveRoute($this->container->make('flarum.backoffice.routes'));
        });

        $this->container->singleton('flarum.backoffice.handler', function () {
            $pipe = new MiddlewarePipe();

            foreach ($this->container->make('flarum.backoffice.middleware') as $middleware) {
                $pipe->pipe($this->container->make($middleware));
            }

            $pipe->pipe(new HttpMiddleware\ExecuteRoute());

            return $pipe;
        });

        $this->container->bind('flarum.assets.backoffice', function () {
            /** @var Assets $assets */
            $assets = $this->container->make('flarum.assets.factory')('backoffice');
            /** @var Paths $paths */
            $paths = $this->container->make(Paths::class);

            $assets->js(function (SourceCollector $sources) use ($paths) {
                // We re-use Flarum's admin javascript as base
                $sources->addFile($paths->vendor . '/flarum/core/js/dist/admin.js');
                $sources->addFile(__DIR__ . '/../../js/dist/backoffice.js');
                $sources->addString(function () {
                    return $this->container->make(Formatter::class)->getJs();
                });

                // The markdown toolbar is only added to the forum but we want it available when using TextEditor in the backoffice
                // TODO: remove if this is fixed in Flarum since the file would be included twice
                $markdownJs = $paths->vendor . '/flarum/markdown/js/dist/forum.js';
                if (file_exists($markdownJs)) {
                    $sources->addString(function () {
                        return 'var module={}';
                    });
                    $sources->addFile($markdownJs);
                    $sources->addString(function () {
                        return "flarum.extensions['flarum-markdown']=module.exports";
                    });
                }
            });

            $assets->css(function (SourceCollector $sources) use ($paths) {
                // We re-use Flarum's admin Less as base
                $sources->addFile($paths->vendor . '/flarum/core/less/admin.less');
                //$sources->addFile(__DIR__ . '/../../resources/less/backoffice.less');
                $sources->addString(function () {
                    return $this->container->make(SettingsRepositoryInterface::class)->get('custom_less', '');
                });
            });

            $this->container->make(AddTranslations::class)->forFrontend('admin|backoffice')->to($assets);
            $this->container->make(AddLocaleAssets::class)->to($assets);

            return $assets;
        });

        $this->container->bind('flarum.frontend.backoffice', function () {
            //return $this->container->make('flarum.frontend.factory')('backoffice');

            $frontend = $this->container->make(Frontend::class);

            $frontend->content(function (Document $document) {
                $document->appView = 'flamarkt::frontend.app';
                $document->layoutView = 'flamarkt::frontend.backoffice';
            });

            $frontend->content($this->container->make(FrontendContent\Assets::class)->forFrontend('backoffice'));
            $frontend->content($this->container->make(FrontendContent\CorePayload::class));
            $frontend->content($this->container->make(FrontendContent\Meta::class));
            $frontend->content($this->container->make(AdminPayload::class));

            return $frontend;
        });
    }

    public function boot()
    {
        $events = $this->container->make('events');

        $events->listen(
            [Enabled::class, Disabled::class, ClearingCache::class],
            function () {
                $recompile = new RecompileFrontendAssets(
                    $this->container->make('flarum.assets.backoffice'),
                    $this->container->make(LocaleManager::class)
                );
                $recompile->flush();
            }
        );

        $events->listen(
            Saved::class,
            function (Saved $event) {
                $recompile = new RecompileFrontendAssets(
                    $this->container->make('flarum.assets.backoffice'),
                    $this->container->make(LocaleManager::class)
                );
                $recompile->whenSettingsSaved($event);
            }
        );
    }

    protected function setDefaultRoute(RouteCollection $routes)
    {
        /**
         * @var $factory RouteHandlerFactory
         */
        $factory = $this->container->make(RouteHandlerFactory::class);
        $defaultRoute = $this->container->make('flarum.settings')->get('backoffice_default_route');

        if (isset($routes->getRoutes()['GET'][$defaultRoute]['handler'])) {
            $toDefaultController = $routes->getRoutes()['GET'][$defaultRoute]['handler'];
        } else {
            $toDefaultController = $factory->toFrontend('backoffice', Content\Dashboard::class);
        }

        $routes->get(
            '/',
            'default',
            $toDefaultController
        );
    }
}
