import AccountPage from './pages/AccountPage';
import OrderIndexPage from './pages/OrderIndexPage';
import CartPage from './pages/CartPage';
import ProductIndexPage from './pages/ProductIndexPage';
import ProductShowPage from './pages/ProductShowPage';
import OrderShowPage from './pages/OrderShowPage';
import Product from '../common/models/Product';
import Order from '../common/models/Order';

export default function (app) {
    app.routes['flamarkt.account'] = {path: '/account', component: AccountPage};
    app.routes['flamarkt.account.orders'] = {path: '/account/orders', component: OrderIndexPage};
    app.routes['flamarkt.cart'] = {path: '/cart', component: CartPage};
    app.routes['flamarkt.products.index'] = {path: '/products', component: ProductIndexPage};
    app.routes['flamarkt.products.show'] = {path: '/products/:id', component: ProductShowPage};
    app.routes['flamarkt.orders.show'] = {path: '/orders/:id', component: OrderShowPage};

    app.route.product = (product: Product) => {
        return app.route('flamarkt.products.show', {
            id: product.slug(),
        });
    };
    app.route.order = (order: Order) => {
        return app.route('flamarkt.orders.show', {
            id: order.slug(),
        });
    };
}
