import app from 'flamarkt/backoffice/backoffice/app';
import Model from 'flarum/common/Model';
import Order from '../common/models/Order';
import OrderLine from '../common/models/OrderLine';
import Payment from '../common/models/Payment';
import Product from '../common/models/Product';
import {common} from '../common/compat';
import {backoffice} from './compat';
import addNavLinks from './addNavLinks';
import addRoutes from './addRoutes';
import registerSettings from './registerSettings';

export {
    common,
    backoffice,
};

app.initializers.add('flamarkt-core', () => {
    app.store.models['flamarkt-orders'] = Order;
    app.store.models['flamarkt-order-lines'] = OrderLine;
    app.store.models['flamarkt-payments'] = Payment;
    app.store.models['flamarkt-products'] = Product;

    // @ts-ignore no way to type-hint this at the moment
    app.store.models.users.prototype.flamarktOrderCount = Model.attribute('flamarktOrderCount');

    // Routes registration must be done before nav links
    addRoutes();
    addNavLinks();
    registerSettings();
});
