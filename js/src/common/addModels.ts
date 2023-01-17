import app from 'flarum/common/app';
import Cart from './models/Cart';
import Order from './models/Order';
import OrderLine from './models/OrderLine';
import Payment from './models/Payment';
import Product from './models/Product';

export default function () {
    app.store.models['flamarkt-carts'] = Cart;
    app.store.models['flamarkt-orders'] = Order;
    app.store.models['flamarkt-order-lines'] = OrderLine;
    app.store.models['flamarkt-payments'] = Payment;
    app.store.models['flamarkt-products'] = Product;
}
