import Link from 'flarum/common/components/Link';
import OrderListState from '../../common/states/OrderListState';
import AbstractShopPage from './AbstractShopPage';
import OrderSortDropdown from '../../common/components/OrderSortDropdown';

export default class OrderIndexPage extends AbstractShopPage {
    state!: OrderListState;

    oninit(vnode) {
        super.oninit(vnode);

        this.state = new OrderListState({
            filter: {
                user: app.session.user ? app.session.user.username() : 0,
            },
        });
        this.state.refresh();
    }

    content() {
        return m('div', [
            m('h1', 'Orders'),
            m('.Form-group', [
                m(OrderSortDropdown, {
                    state: this.state,
                }),
            ]),
            m('ul', this.state.pages.map(page => page.items.map(order => m('li', m(Link, {
                href: app.route('flamarkt.orders.show', {
                    id: order.id(),
                }),
            }, order.number()))))),
        ]);
    }
}
