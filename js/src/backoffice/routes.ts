import DashboardPage from './pages/DashboardPage';
import ProductIndexPage from './pages/ProductIndexPage';
import ProductShowPage from './pages/ProductShowPage';
import OrderIndexPage from './pages/OrderIndexPage';
import OrderShowPage from './pages/OrderShowPage';
import UserIndexPage from './pages/UserIndexPage';
import UserShowPage from './pages/UserShowPage';
import ExtensionPage from 'flarum/admin/components/ExtensionPage';
import ExtensionPageResolver from './resolvers/ExtensionPageResolver';

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
}
