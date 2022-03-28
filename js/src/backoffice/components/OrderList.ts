import app from 'flamarkt/backoffice/backoffice/app';
import LinkButton from 'flarum/common/components/LinkButton';
import AbstractList from 'flamarkt/backoffice/backoffice/components/AbstractList';
import Order from '../../common/models/Order';
import username from 'flarum/common/helpers/username';
import humanTime from 'flarum/common/helpers/humanTime';
import PriceLabel from '../../common/components/PriceLabel';

export default class OrderList extends AbstractList<Order> {
    head() {
        const columns = super.head();

        columns.add('number', m('th', app.translator.trans('flamarkt-core.backoffice.orders.head.number')), 50);
        columns.add('date', m('th', app.translator.trans('flamarkt-core.backoffice.orders.head.date')), 40);
        columns.add('user', m('th', app.translator.trans('flamarkt-core.backoffice.orders.head.user')), 30);
        columns.add('priceTotal', m('th', app.translator.trans('flamarkt-core.backoffice.orders.head.priceTotal')), 20);
        columns.add('paidAmount', m('th', app.translator.trans('flamarkt-core.backoffice.orders.head.paidAmount')), 10);
        columns.add('productCount', m('th', app.translator.trans('flamarkt-core.backoffice.orders.head.productCount')), 5);

        return columns;
    }

    columns(order: Order) {
        const columns = super.columns(order);

        columns.add('number', m('td', order.number()), 50);
        columns.add('date', m('td', humanTime(order.createdAt())), 40);
        columns.add('user', m('td', username(order.user())), 30);
        columns.add('priceTotal', m('td', m(PriceLabel, {
            value: order.priceTotal(),
        })), 20);
        columns.add('paidAmount', m('td', m(PriceLabel, {
            value: order.paidAmount(),
        })), 10);
        columns.add('productCount', m('td', order.productCount()), 5);

        return columns;
    }

    actions(order: Order) {
        const actions = super.actions(order);

        actions.add('edit', LinkButton.component({
            className: 'Button Button--icon',
            icon: 'fas fa-pen',
            href: app.route.order(order),
        }));

        return actions;
    }
}
