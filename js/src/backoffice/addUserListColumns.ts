import app from 'flamarkt/backoffice/backoffice/app';
import {extend} from 'flarum/common/extend';
import Link from 'flarum/common/components/Link';
import UserList from 'flamarkt/backoffice/backoffice/components/UserList';

export default function () {
    extend(UserList.prototype, 'head', function (columns) {
        columns.add('orders', m('th', app.translator.trans('flamarkt-core.backoffice.users.head.orders')), 10);
    });

    extend(UserList.prototype, 'columns', function (columns, user) {
        columns.add('orders', m('td', m(Link, {
            href: app.route('orders.index') + '?' + m.buildQueryString({
                user: user.slug(),
            }),
        }, user.flamarktOrderCount())), 10);
    });
}
