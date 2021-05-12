import {extend} from 'flarum/common/extend';
import SessionDropdown from 'flarum/forum/components/SessionDropdown';
import LinkButton from 'flarum/common/components/LinkButton';
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

    extend(SessionDropdown.prototype, 'items', items => {
        if (app.forum.attribute('backofficeUrl')) {
            items.add('flamarkt-backoffice', LinkButton.component({
                icon: 'fas fa-shopping-cart',
                href: app.forum.attribute('backofficeUrl'),
                target: '_blank',
            }, app.translator.trans('flamarkt-core.forum.nav.backoffice')));
        }
    });

    extend(IndexPage.prototype, 'navItems', items => {
        items.add('flamarkt-products', ActiveLinkButton.component({
            icon: 'fas fa-shopping-cart',
            href: app.route('flamarkt.products.index'),
            activeRoutes: [
                'products.*',
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

    extend(HeaderSecondary.prototype, 'items', function (items) {
        items.add('flamarkt-cart', CartDropdown.component({state: app.cart}), 15);
    })
});
