import Page from 'flarum/common/components/Page';
import LinkButton from 'flarum/common/components/LinkButton';
import OrderListState from '../../common/states/OrderListState';
import OrderList from '../components/OrderList';

export default class OrderIndexPage extends Page {
    state!: OrderListState;

    oninit(vnode) {
        super.oninit(vnode);

        this.state = new OrderListState();
        this.state.refresh();
    }

    view() {
        return m('.ProductIndexPage', [
            m('.Form-group', [
                LinkButton.component({
                    className: 'Button',
                    href: app.route('orders.show', {
                        id: 'new',
                    }),
                }, 'New order' /* TODO */),
            ]),
            m(OrderList, {
                state: this.state,
            }),
        ]);
    }
}
