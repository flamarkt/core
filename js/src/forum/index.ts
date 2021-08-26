import app from 'flarum/forum/app';
import {extend, override} from 'flarum/common/extend';
import SessionDropdown from 'flarum/forum/components/SessionDropdown';
import LinkButton from 'flarum/common/components/LinkButton';
import ItemList from 'flarum/common/utils/ItemList';
import Cart from '../common/models/Cart';
import Order from '../common/models/Order';
import OrderLine from '../common/models/OrderLine';
import Product from '../common/models/Product';
import {common} from '../common/compat';
import {forum} from './compat';
import IndexPage from 'flarum/forum/components/IndexPage';
import Forum from 'flarum/common/models/Forum';
import Model from 'flarum/common/Model';
import HeaderSecondary from 'flarum/forum/components/HeaderSecondary';
import CartDropdown from './components/CartDropdown';
import CartState from './states/CartState';
import ActiveLinkButton from '../common/components/ActiveLinkButton';
import routes from './routes';
import patchModelHasOneNull from '../common/patchModelHasOneNull';
import patchStoreAllowVerbatimRelationships from '../common/patchStoreAllowVerbatimRelationships';
import NotificationGrid from 'flarum/forum/components/NotificationGrid';
import Search from 'flarum/forum/components/Search';
import ForumApplication from 'flarum/forum/ForumApplication';
import ProductSearchSource from './components/ProductSearchSource';

export {
    common,
    forum,
};

app.initializers.add('flamarkt-core', () => {
    app.store.models['flamarkt-carts'] = Cart;
    app.store.models['flamarkt-orders'] = Order;
    app.store.models['flamarkt-order-lines'] = OrderLine;
    app.store.models['flamarkt-products'] = Product;

    // @ts-ignore
    Forum.prototype.cart = Model.hasOne('cart');

    routes(app);

    app.cart = new CartState();

    extend(ForumApplication.prototype, 'mount', () => {
        app.cart.boot();

        // Refresh the cart when clicking home, just like the user notifications do
        $('#home-link').click((e) => {
            if (e.ctrlKey || e.metaKey || e.which === 2) return;
            // We won't prevent default here, the Flarum handler for the same event already does

            // Reload the current user so that their unread notification count is refreshed.
            if (app.session.user) {
                app.cart.load();
            }
        });
    });

    extend(SessionDropdown.prototype, 'items', function (items: ItemList) {
        if (app.forum.attribute('backofficeUrl')) {
            items.add('flamarkt-backoffice', LinkButton.component({
                icon: 'fas fa-shopping-cart',
                href: app.forum.attribute('backofficeUrl'),
                target: '_blank',
            }, app.translator.trans('flamarkt-core.forum.nav.backoffice')));
        }
    });

    extend(IndexPage.prototype, 'navItems', function (items: ItemList) {
        items.add('flamarkt-products', ActiveLinkButton.component({
            icon: 'fas fa-shopping-cart',
            href: app.route('flamarkt.products.index'),
            activeRoutes: [
                'flamarkt.products.*',
            ],
        }, app.translator.trans('flamarkt-core.forum.nav.shop')));

        items.add('flamarkt-account', ActiveLinkButton.component({
            icon: 'fas fa-user',
            href: app.route('flamarkt.account'),
            activeRoutes: [
                'flamarkt.account.*',
                'flamarkt.orders.show',
            ],
        }, app.translator.trans('flamarkt-core.forum.nav.account')));
    });

    extend(HeaderSecondary.prototype, 'items', function (items: ItemList) {
        items.add('flamarkt-cart', CartDropdown.component({state: app.cart}), 15);
    });

    extend(NotificationGrid.prototype, 'notificationTypes', function (items: ItemList) {
        items.add('orderReceived', {
            name: 'orderReceived',
            icon: 'far fa-thumbs-up',
            label: app.translator.trans('flamarkt-core.forum.settings.notifyOrderReceived'),
        });
    });

    override(NotificationGrid.prototype, 'preferenceKey', function (original: any, type: string, method: string) {
        // Since there's no other way to disable a web notification, we'll make it point to a non-existent setting so Flarum shows it as disabled
        // The actual access restriction is done during the user saving event
        if (type === 'orderReceived' && method === 'alert') {
            return '__not_exists';
        }

        return original(type, method);
    });

    extend(Search.prototype, 'sourceItems', function (items: ItemList) {
        // Ideally we'd insert it between discussions and users, but they have the same priority, so we insert before everything
        items.add('products', new ProductSearchSource(), -10);
    });
});

app.initializers.add('flamarkt-core-patch', () => {
    patchModelHasOneNull();
    patchStoreAllowVerbatimRelationships();
}, 100);
