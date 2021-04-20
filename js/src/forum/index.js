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

export {
    common,
    forum,
};

app.initializers.add('flamarkt-core', () => {
    app.store.models['flamarkt-carts'] = Cart;
    app.store.models['flamarkt-orders'] = Order;
    app.store.models['flamarkt-order-lines'] = OrderLine;
    app.store.models['flamarkt-products'] = Product;

    Forum.prototype.cart = Model.hasOne('cart');

    app.routes['cart'] = {path: '/cart', component: CartPage};
    app.routes['products.index'] = {path: '/products', component: ProductIndexPage};
    app.routes['products.show'] = {path: '/products/:id', component: ProductShowPage};

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
        items.add('flamarkt-products', LinkButton.component({
            icon: 'fas fa-shopping-cart',
            href: app.route('products.index'),
        }, 'Shop' /* TODO */));
    });

    extend(HeaderSecondary.prototype, 'items', function (items) {
        items.add('flamarkt-cart', CartDropdown.component({state: app.cart}), 10);
    })
});
