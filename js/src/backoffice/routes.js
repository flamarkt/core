import DashboardPage from './pages/DashboardPage';
import ProductIndexPage from './pages/ProductIndexPage';
import ProductShowPage from './pages/ProductShowPage';
import OrderListPage from './pages/OrderListPage';
import OrderShowPage from './pages/OrderShowPage';
import ExtensionPage from 'flarum/admin/components/ExtensionPage';
import ExtensionPageResolver from 'flarum/admin/resolvers/ExtensionPageResolver';

export default function (app) {
    app.routes = {
        dashboard: {path: '/dashboard', component: DashboardPage},
        'products.index': {path: '/products', component: ProductIndexPage},
        'products.show': {path: '/products/:id', component: ProductShowPage},
        'orders.index': {path: '/orders', component: OrderListPage},
        'orders.show': {path: '/orders/:id', component: OrderShowPage},
        extension: {path: '/extension/:id', component: ExtensionPage, /*resolverClass: ExtensionPageResolver*/},
    };
}
