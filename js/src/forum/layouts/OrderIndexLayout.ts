import AbstractAccountLayout, {AbstractAccountLayoutAttrs} from './AbstractAccountLayout';
import OrderListState from '../../common/states/OrderListState';
import OrderSortDropdown from '../../common/components/OrderSortDropdown';
import Link from 'flarum/common/components/Link';

export interface OrderIndexLayoutAttrs extends AbstractAccountLayoutAttrs {
    state: OrderListState,
}

export default class OrderIndexLayout extends AbstractAccountLayout<OrderIndexLayoutAttrs> {
    className() {
        return 'OrderIndexPage';
    }

    title() {
        return 'Orders';
    }

    content() {
        return m('div', [
            m('.Form-group', [
                m(OrderSortDropdown, {
                    state: this.attrs.state,
                }),
            ]),
            m('ul', this.attrs.state.pages.map(page => page.items.map(order => m('li', m(Link, {
                href: app.route('flamarkt.orders.show', {
                    id: order.id(),
                }),
            }, order.number()))))),
            //TODO: pagination
        ]);
    }
}
