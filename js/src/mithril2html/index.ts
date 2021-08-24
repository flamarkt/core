import {OrderSummary} from './pages/OrderSummary';
import {ProductSummary} from './pages/ProductSummary';
import {mithril2html} from './compat';

export {
    mithril2html,
};

app.initializers.add('flamarkt-core-mithril2html', () => {
    app.routes['flamarkt.order.summary'] = {path: '/flamarkt/order-summary', component: OrderSummary};
    app.routes['flamarkt.product.summary'] = {path: '/flamarkt/product-summary', component: ProductSummary};
});
