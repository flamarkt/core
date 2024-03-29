<?php

namespace Flamarkt\Core;

use ClarkWinkelmann\Mithril2Html\Extend as M2HExtend;
use ClarkWinkelmann\Scout\Extend\Scout;
use Flamarkt\Core\Order\Event as OrderEvent;
use Flamarkt\Core\Product\Event as ProductEvent;
use Flarum\Api\Controller\ShowForumController;
use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Api\Serializer\UserSerializer;
use Flarum\Extend;
use Flarum\User\Event as UserEvent;
use Flarum\User\User;

$extenders = [
    (new Extend\ServiceProvider())
        ->register(Order\OrderServiceProvider::class)
        ->register(Product\ProductServiceProvider::class),

    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js'),

    (new Extend\Frontend('backoffice'))
        ->js(__DIR__ . '/js/dist/backoffice.js')
        ->css(__DIR__ . '/resources/less/backoffice.less')
        ->route('/orders', 'orders.index')
        ->route('/orders/{id}', 'orders.show')
        ->route('/products', 'products.index')
        ->route('/products/{id}', 'products.show'),

    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/forum.js')
        ->css(__DIR__ . '/resources/less/forum.less')
        ->route('/cart', 'flamarkt.cart')
        ->route('/account', 'flamarkt.account')
        ->route('/account/orders', 'flamarkt.account.orders')
        ->route('/orders/{id}', 'flamarkt.orders.show', Forum\Content\Order::class)
        ->route('/products', 'flamarkt.products.index', Forum\Content\Products::class)
        ->route('/products/{id}', 'flamarkt.products.show', Forum\Content\Product::class),

    new M2HExtend\Setup(),

    (new M2HExtend\FrontendNoConflict('mithril2html'))
        ->js(__DIR__ . '/js/dist/mithril2html.js'),

    new Extend\Locales(__DIR__ . '/resources/locale'),

    (new Extend\Routes('api'))
        ->get('/flamarkt/cart', 'flamarkt.cart', Api\Controller\CartSessionController::class)
        ->patch('/flamarkt/carts/{id}', 'flamarkt.carts.update', Api\Controller\CartUpdateController::class)
        //
        ->get('/flamarkt/orders', 'flamarkt.orders.index', Api\Controller\OrderIndexController::class)
        ->post('/flamarkt/orders', 'flamarkt.orders.store', Api\Controller\OrderStoreController::class)
        ->get('/flamarkt/orders/{id}', 'flamarkt.orders.show', Api\Controller\OrderShowController::class)
        ->patch('/flamarkt/orders/{id}', 'flamarkt.orders.update', Api\Controller\OrderUpdateController::class)
        ->delete('/flamarkt/orders/{id}', 'flamarkt.orders.delete', Api\Controller\OrderDeleteController::class)
        //
        ->post('/flamarkt/orders/{id}/payments', 'flamarkt.payments.store', Api\Controller\PaymentStoreController::class)
        ->patch('/flamarkt/payments/{id}', 'flamarkt.payments.update', Api\Controller\PaymentUpdateController::class)
        ->delete('/flamarkt/payments/{id}', 'flamarkt.payments.delete', Api\Controller\PaymentDeleteController::class)
        //
        ->get('/flamarkt/products', 'flamarkt.products.index', Api\Controller\ProductIndexController::class)
        ->post('/flamarkt/products', 'flamarkt.products.store', Api\Controller\ProductStoreController::class)
        ->get('/flamarkt/products/{id}', 'flamarkt.products.show', Api\Controller\ProductShowController::class)
        ->patch('/flamarkt/products/{id}', 'flamarkt.products.update', Api\Controller\ProductUpdateController::class)
        ->delete('/flamarkt/products/{id}', 'flamarkt.products.delete', Api\Controller\ProductDeleteController::class),

    (new Extend\Middleware('forum'))
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
        ->modelPolicy(Cart\Cart::class, Cart\Access\CartPolicy::class)
        ->modelPolicy(Order\Order::class, Order\Access\OrderPolicy::class)
        ->modelPolicy(Product\Product::class, Product\Access\ProductPolicy::class),

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
        ->listen(UserEvent\Saving::class, Listener\SaveUser::class)
        ->listen(Cart\Event\WillOrder::class, Listener\EnsureCartNotEmpty::class)
        ->listen(Order\Event\Created::class, Listener\SendOrderConfirmation::class),

    (new Extend\ModelUrl(Order\Order::class))
        ->addSlugDriver('default', Order\UidSlugDriver::class)
        ->addSlugDriver('id', Order\IdSlugDriver::class),
    (new Extend\ModelUrl(Product\Product::class))
        ->addSlugDriver('default', Product\UidSlugDriver::class)
        ->addSlugDriver('id', Product\IdSlugDriver::class),

    (new Extend\Notification())
        ->type(Notification\OrderReceivedBlueprint::class, Api\Serializer\BasicOrderSerializer::class, ['email']),
];

if (class_exists(Scout::class)) {
    $extenders[] = (new Scout(Product\Product::class))
        ->listenSaved(ProductEvent\Created::class, function (ProductEvent\Created $event) {
            return $event->product;
        })
        ->listenSaved(ProductEvent\Renamed::class, function (ProductEvent\Renamed $event) {
            return $event->product;
        })
        ->listenSaved(ProductEvent\DescriptionChanged::class, function (ProductEvent\DescriptionChanged $event) {
            return $event->product;
        })
        ->listenDeleted(ProductEvent\Deleted::class, function (ProductEvent\Deleted $event) {
            return $event->product;
        })
        ->attributes(function (Product\Product $product): array {
            return [
                'title' => $product->title,
                'description' => $product->description,
            ];
        });
    $extenders[] = (new Scout(Order\Order::class))
        ->listenSaved(OrderEvent\Created::class, function (OrderEvent\Created $event) {
            return $event->order;
        })
        ->listenDeleted(OrderEvent\Deleted::class, function (OrderEvent\Deleted $event) {
            return $event->order;
        })
        // TODO: event for user change
        ->attributes(function (Order\Order $order): array {
            return [
                'user' => optional($order->user)->display_name,
                // TODO: use number attribute when it's added in a future update
                'number' => $order->id,
            ];
        });
}

return $extenders;
