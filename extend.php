<?php

namespace Flamarkt\Core;

use Flarum\Api\Controller\ShowForumController;
use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Api\Serializer\UserSerializer;
use Flarum\Extend;
use Flarum\Frontend\Document;
use Flarum\User\User;
use Illuminate\Support\Arr;

return [
    (new Extend\ServiceProvider())
        // It's important for the provider to run before we call the Frontend extender with our new frontend
        ->register(Backoffice\BackofficeServiceProvider::class)
        ->register(Order\OrderServiceProvider::class)
        ->register(Product\ProductServiceProvider::class),

    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js')
        ->content(function (Document $document) {
            if (!$document->payload['extensions']) {
                return;
            }

            foreach ($document->payload['extensions'] as $key => $attributes) {
                if (Arr::get($attributes, 'extra.flamarkt-backoffice.hideFromAdmin')) {
                    unset($document->payload['extensions'][$key]);
                }
            }
        }),

    (new Extend\Frontend('backoffice'))
        //->js(__DIR__ . '/js/dist/backoffice.js')
        ->css(__DIR__ . '/resources/less/backoffice.less')
        ->route('/dashboard', 'dashboard', Backoffice\Content\Dashboard::class)
        ->route('/orders', 'orders.index')
        ->route('/orders/{id:[0-9]+|new}', 'orders.show')
        ->route('/products', 'products.index')
        ->route('/products/{id:[0-9]+|new}', 'products.show')
        ->route('/users', 'users.index')
        ->route('/users/{id:[0-9]+|new}', 'users.show')
        ->route('/extension/{id:[a-zA-Z0-9_-]+}', 'extension'),

    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/forum.js')
        ->css(__DIR__ . '/resources/less/forum.less')
        ->route('/cart', 'flamarkt.cart')
        ->route('/account', 'flamarkt.account')
        ->route('/account/orders', 'flamarkt.account.orders')
        ->route('/orders/{id}', 'flamarkt.orders.show')
        ->route('/products', 'flamarkt.products.index')
        ->route('/products/{id}', 'flamarkt.products.show'),

    new Extend\Locales(__DIR__ . '/resources/locale'),

    (new Extend\Routes('api'))
        ->get('/flamarkt/cart', 'flamarkt.cart', Api\Controller\CartSessionController::class)
        //
        ->get('/flamarkt/orders', 'flamarkt.orders.index', Api\Controller\OrderIndexController::class)
        ->post('/flamarkt/orders', 'flamarkt.orders.store', Api\Controller\OrderStoreController::class)
        ->get('/flamarkt/orders/{id}', 'flamarkt.orders.show', Api\Controller\OrderShowController::class)
        ->patch('/flamarkt/orders/{id}', 'flamarkt.orders.update', Api\Controller\OrderUpdateController::class)
        ->delete('/flamarkt/orders/{id}', 'flamarkt.orders.delete', Api\Controller\OrderDeleteController::class)
        //
        ->get('/flamarkt/products', 'flamarkt.products.index', Api\Controller\ProductIndexController::class)
        ->post('/flamarkt/products', 'flamarkt.products.store', Api\Controller\ProductStoreController::class)
        ->get('/flamarkt/products/{id}', 'flamarkt.products.show', Api\Controller\ProductShowController::class)
        ->patch('/flamarkt/products/{id}', 'flamarkt.products.update', Api\Controller\ProductUpdateController::class)
        ->delete('/flamarkt/products/{id}', 'flamarkt.products.delete', Api\Controller\ProductDeleteController::class),

    (new Extend\Middleware('forum'))
        ->insertBefore('flarum.forum.route_resolver', Backoffice\Middleware\SubForumRouter::class)
        ->add(Cart\CartMiddleware::class),

    (new Extend\Middleware('api'))
        ->add(Cart\CartMiddleware::class),

    (new Extend\View())
        ->namespace('flamarkt', __DIR__ . '/views'),

    (new Extend\Filter(Order\OrderFilterer::class))
        ->addFilter(Order\Gambit\UserGambit::class),
    (new Extend\SimpleFlarumSearch(Order\OrderSearcher::class))
        ->addGambit(Order\Gambit\UserGambit::class)
        ->setFullTextGambit(Order\Gambit\FullTextGambit::class),

    (new Extend\Filter(Product\ProductFilterer::class))
        ->addFilter(Product\Gambit\TypeGambit::class),
    (new Extend\SimpleFlarumSearch(Product\ProductSearcher::class))
        ->addGambit(Product\Gambit\TypeGambit::class)
        ->setFullTextGambit(Product\Gambit\FullTextGambit::class),

    (new Extend\ApiSerializer(ForumSerializer::class))
        ->hasOne('cart', Api\Serializer\CartSerializer::class)
        ->attributes(ForumAttributes::class),

    (new Extend\ApiController(ShowForumController::class))
        ->addInclude(['cart']) // TODO: prefix?
        ->prepareDataForSerialization(LoadForumCartRelationship::class),

    (new Extend\ApiSerializer(UserSerializer::class))
        ->attributes(UserAttributes::class),

    (new Extend\Policy())
        ->modelPolicy(Order\Order::class, Order\Access\OrderPolicy::class)
        ->modelPolicy(Product\Product::class, Product\Access\ProductPolicy::class)
        ->globalPolicy(GlobalPolicy::class),

    (new Extend\ModelVisibility(Cart\Cart::class))
        ->scope(Cart\Access\ScopeCartVisibility::class),
    (new Extend\ModelVisibility(Order\Order::class))
        ->scope(Order\Scope\View::class)
        ->scope(Order\Scope\Enumerate::class, 'viewEnumerate'),
    (new Extend\ModelVisibility(Product\Product::class))
        ->scope(Product\Scope\View::class)
        ->scope(Product\Scope\Enumerate::class, 'viewEnumerate'),

    (new Extend\Model(User::class))
        ->hasMany('carts', Cart\Cart::class)
        ->hasMany('orders', Order\Order::class),

    (new Extend\Event())
        ->subscribe(Listener\UpdateUserOrderMeta::class)
        ->listen(Order\Event\Created::class, Listener\SendOrderConfirmation::class),

    (new Extend\ModelUrl(Order\Order::class))
        ->addSlugDriver('default', Order\IdSlugDriver::class),
    (new Extend\ModelUrl(Product\Product::class))
        ->addSlugDriver('default', Product\IdSlugDriver::class),

    (new Extend\Notification())
        ->type(Notification\OrderReceivedBlueprint::class, Api\Serializer\BasicOrderSerializer::class, ['email']),

    (new Extend\View())
        ->namespace('flamarkt-core', __DIR__ . '/resources/views'),
];
