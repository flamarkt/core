import DashboardPage from './pages/DashboardPage';
import ProductIndexPage from './pages/ProductIndexPage';
import ProductShowPage from './pages/ProductShowPage';
import OrderIndexPage from './pages/OrderIndexPage';
import OrderShowPage from './pages/OrderShowPage';
import UserIndexPage from './pages/UserIndexPage';
import UserShowPage from './pages/UserShowPage';
import ExtensionPage from 'flarum/admin/components/ExtensionPage';
import ExtensionPageResolver from './resolvers/ExtensionPageResolver';
import Product from '../common/models/Product';
import User from 'flarum/common/models/User';
import Order from '../common/models/Order';

export default function (app) {
    app.routes = {
        dashboard: {path: '/dashboard', component: DashboardPage},
        'products.index': {path: '/products', component: ProductIndexPage},
        'products.show': {path: '/products/:id', component: ProductShowPage},
        'orders.index': {path: '/orders', component: OrderIndexPage},
        'orders.show': {path: '/orders/:id', component: OrderShowPage},
        'users.index': {path: '/users', component: UserIndexPage},
        'users.show': {path: '/users/:id', component: UserShowPage},
        extension: {path: '/extension/:id', component: ExtensionPage, resolverClass: ExtensionPageResolver},
    };

    app.route.product = (product: Product) => {
        return app.route('products.show', {
            id: product.id(),
        });
    };
    app.route.user = (user: User) => {
        return app.route('users.show', {
            id: user.id(),
        });
    };
    app.route.order = (order: Order) => {
        return app.route('orders.show', {
            id: order.id(),
        });
    };
}
