import Button from 'flarum/common/components/Button';
import LinkButton from 'flarum/common/components/LinkButton';
import AbstractList from './AbstractList';
import Order from '../../common/models/Order';
import username from 'flarum/common/helpers/username';
import humanTime from 'flarum/common/helpers/humanTime';

export default class OrderList extends AbstractList {
    head() {
        const columns = super.head();

        columns.add('date', m('th', app.translator.trans('flamarkt-core.backoffice.orders.head.date')), 20);
        columns.add('user', m('th', app.translator.trans('flamarkt-core.backoffice.orders.head.user')), 10);

        return columns;
    }

    columns(order: Order) {
        const columns = super.columns(order);

        columns.add('date', m('td', humanTime(order.createdAt())), 20);
        columns.add('user', m('td', username(order.user())), 10);

        return columns;
    }

    actions(order: Order) {
        const actions = super.actions(order);

        actions.add('edit', LinkButton.component({
            className: 'Button Button--icon',
            icon: 'fas fa-pen',
            href: app.route.order(order),
        }));

        actions.add('hide', Button.component({
            className: 'Button Button--icon',
            icon: 'fas fa-times',
        }));

        return actions;
    }
}
