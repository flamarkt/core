import {Vnode} from 'mithril';
import Page from 'flarum/common/components/Page';
import Order from '../../common/models/Order';
import OrderTable from 'flamarkt/core/forum/components/OrderTable';

export class OrderSummary extends Page {
    order!: Order

    oninit(vnode: Vnode) {
        super.oninit(vnode);

        this.order = app.preloadedApiDocument() as Order;
    }

    view() {
        return m('div', [
            m(OrderTable, {
                order: this.order,
            }),
        ]);
    }
}
