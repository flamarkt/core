import BackofficeApplication from './BackofficeApplication';
import Order from '../common/models/Order';
import OrderLine from '../common/models/OrderLine';
import Product from '../common/models/Product';
import {common} from '../common/compat';
import {backoffice} from './compat';
import patchStore from './patchStore';
import {AdditionalApplication} from '../../shims';
import User from 'flarum/common/models/User';

// The original AdminApplication still gets created, but we override it here
// The boot method of the original will never be called
// @ts-ignore
const app: BackofficeApplication & AdditionalApplication = new BackofficeApplication();

// @ts-ignore
window.app = app;

export {
    app,
    common,
    backoffice,
};

// TODO: override in Flarum compat object?

app.initializers.add('flamarkt-core', () => {
    app.store.models['flamarkt-orders'] = Order;
    app.store.models['flamarkt-order-lines'] = OrderLine;
    app.store.models['flamarkt-products'] = Product;

    app.route.product = (product: Product) => {
        return app.route('products.show', {
            id: product.id(),
        });
    };
    app.route.user = (user: User) => {
        return app.route('users.show', {
            id: user.slug(),
        });
    };
    app.route.order = (order: Order) => {
        return app.route('orders.show', {
            id: order.id(),
        });
    };
});

patchStore();
