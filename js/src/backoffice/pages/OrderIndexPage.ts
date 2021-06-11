import Page from 'flarum/common/components/Page';
import LinkButton from 'flarum/common/components/LinkButton';
import OrderListState from '../../common/states/OrderListState';
import OrderList from '../components/OrderList';
import OrderSortDropdown from '../../common/components/OrderSortDropdown';

export default class OrderIndexPage extends Page {
    state!: OrderListState;

    oninit(vnode) {
        super.oninit(vnode);

        this.state = new OrderListState();
        this.state.refresh();
    }

    view() {
        return m('.OrderIndexPage', m('.container', [
            m('.Form-group', [
                LinkButton.component({
                    className: 'Button',
                    href: app.route('orders.show', {
                        id: 'new',
                    }),
                }, app.translator.trans('flamarkt-core.backoffice.orders.new')),
                m(OrderSortDropdown, {
                    state: this.state,
                }),
            ]),
            m(OrderList, {
                state: this.state,
            }),
        ]));
    }
}
