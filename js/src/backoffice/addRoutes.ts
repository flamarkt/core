import app from 'flamarkt/backoffice/backoffice/app';
import ProductIndexPage from './pages/ProductIndexPage';
import ProductShowPage from './pages/ProductShowPage';
import OrderIndexPage from './pages/OrderIndexPage';
import OrderShowPage from './pages/OrderShowPage';
import Product from '../common/models/Product';
import Order from '../common/models/Order';

export default function () {
    app.routes['products.index'] = {path: '/products', component: ProductIndexPage};
    app.routes['products.show'] = {path: '/products/:id', component: ProductShowPage};
    app.routes['orders.index'] = {path: '/orders', component: OrderIndexPage};
    app.routes['orders.show'] = {path: '/orders/:id', component: OrderShowPage};

    app.route.product = (product: Product) => {
        return app.route('products.show', {
            id: product.id(),
        });
    };
    app.route.order = (order: Order) => {
        return app.route('orders.show', {
            id: order.id(),
        });
    };
}
