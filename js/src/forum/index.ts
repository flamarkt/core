import {extend} from 'flarum/common/extend';
import SessionDropdown from 'flarum/forum/components/SessionDropdown';
import LinkButton from 'flarum/common/components/LinkButton';
import Cart from '../common/models/Cart';
import Order from '../common/models/Order';
import OrderLine from '../common/models/OrderLine';
import Product from '../common/models/Product';
import {common} from '../common/compat';
import {forum} from './compat';
import ProductIndexPage from './pages/ProductIndexPage';
import ProductShowPage from './pages/ProductShowPage';
import IndexPage from 'flarum/forum/components/IndexPage';
import Forum from 'flarum/common/models/Forum';
import Model from 'flarum/common/Model';
import HeaderSecondary from 'flarum/forum/components/HeaderSecondary';
import CartDropdown from './components/CartDropdown';
import CartState from './states/CartState';
import CartPage from './pages/CartPage';
import AccountPage from './pages/AccountPage';
import OrderShowPage from './pages/OrderShowPage';
import OrderIndexPage from './pages/OrderIndexPage';
import ActiveLinkButton from "./components/ActiveLinkButton";

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

    app.routes['flamarkt.account'] = {path: '/account', component: AccountPage};
    app.routes['flamarkt.account.orders'] = {path: '/account/orders', component: OrderIndexPage};
    app.routes['flamarkt.cart'] = {path: '/cart', component: CartPage};
    app.routes['flamarkt.products.index'] = {path: '/products', component: ProductIndexPage};
    app.routes['flamarkt.products.show'] = {path: '/products/:id', component: ProductShowPage};
    app.routes['flamarkt.orders.show'] = {path: '/orders/:id', component: OrderShowPage};

    app.cart = new CartState();

    extend(SessionDropdown.prototype, 'items', items => {
        if (app.forum.attribute('backofficeUrl')) {
            items.add('flamarkt-backoffice', LinkButton.component({
                icon: 'fas fa-wrench',
                href: app.forum.attribute('backofficeUrl'),
                target: '_blank',
            }, 'Backoffice' /* TODO */));
        }
    });

    extend(IndexPage.prototype, 'navItems', items => {
        items.add('flamarkt-products', ActiveLinkButton.component({
            icon: 'fas fa-shopping-cart',
            href: app.route('flamarkt.products.index'),
            activeRoutes: [
                'products.*',
            ],
        }, 'Shop' /* TODO */));

        items.add('flamarkt-account', ActiveLinkButton.component({
            icon: 'fas fa-user',
            href: app.route('flamarkt.account'),
            activeRoutes: [
                'flamarkt.account.*',
                'flamarkt.orders.show',
            ],
        }, 'Account' /* TODO */));
    });

    extend(HeaderSecondary.prototype, 'items', function (items) {
        items.add('flamarkt-cart', CartDropdown.component({state: app.cart}), 10);
    })
});
