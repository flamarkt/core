import BackofficeApplication from './BackofficeApplication';
import Order from '../common/models/Order';
import OrderLine from '../common/models/OrderLine';
import Product from '../common/models/Product';
import {common} from '../common/compat';
import {backoffice} from './compat';
import patchStore from './patchStore';

// The original AdminApplication still gets created, but we override it here
// The boot method of the original will never be called
const app = new BackofficeApplication();

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
});

patchStore();
