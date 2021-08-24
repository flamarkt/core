import AbstractAccountLayout, {AbstractAccountLayoutAttrs} from './AbstractAccountLayout';
import OrderListState from '../../common/states/OrderListState';
import OrderSortDropdown from '../../common/components/OrderSortDropdown';
import Link from 'flarum/common/components/Link';
import humanTime from 'flarum/common/helpers/humanTime';
import PriceLabel from '../../common/components/PriceLabel';
import Button from 'flarum/common/components/Button';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import Placeholder from 'flarum/common/components/Placeholder';
import Order from '../../common/models/Order';
import ItemList from 'flarum/common/utils/ItemList';

export interface OrderIndexLayoutAttrs extends AbstractAccountLayoutAttrs {
    state: OrderListState,
}

export default class OrderIndexLayout extends AbstractAccountLayout<OrderIndexLayoutAttrs> {
    className() {
        return 'OrderIndexPage';
    }

    title() {
        return app.translator.trans('flamarkt-core.forum.orders.headingTitle');
    }

    content() {
        return m('div', [
            m('.Form-group', [
                m(OrderSortDropdown, {
                    state: this.attrs.state,
                }),
            ]),
            m('table.CartTable', [
                m('thead', m('tr', this.headerRow().toArray())),
                m('tbody', [
                    this.attrs.state.pages.map(page => page.items.map(order => m('tr', this.orderRow(order).toArray()))),
                    this.bottomRow(),
                ]),
            ]),
        ]);
    }

    headerRow(): ItemList {
        const columns = new ItemList();

        columns.add('number', m('th', '#'), 40);
        columns.add('createdAt', m('th', 'Date'), 30);
        columns.add('productCount', m('th', 'Products'), 20);
        columns.add('priceTotal', m('th', 'Total'), 10);

        return columns;
    }

    orderRow(order: Order): ItemList {
        const columns = new ItemList();

        columns.add('number', m('td', m(Link, {
            href: app.route.order(order),
        }, order.number())), 40);
        columns.add('createdAt', m('td', humanTime(order.createdAt())), 30);
        columns.add('productCount', m('td', order.productCount()), 20);
        columns.add('priceTotal', m('td', m(PriceLabel, {
            value: order.priceTotal(),
        })), 10);

        return columns;
    }

    bottomRowContent() {
        if (this.attrs.state.loading) {
            return LoadingIndicator.component();
        } else if (this.attrs.state.moreResults) {
            return Button.component({
                className: 'Button Button--block',
                onclick: this.attrs.state.loadMore.bind(this.attrs.state),
            }, 'Load more');
        }

        if (this.attrs.state.pages.length === 0 && !this.attrs.state.loading) {
            return Placeholder.component({
                text: 'No orders yet',
            });
        }
    }

    bottomRow() {
        const content = this.bottomRowContent();

        return content ? m('tr', m('td', {
            colspan: 100,
        }, content)) : null;
    }
}
