import LinkButton from 'flarum/common/components/LinkButton';
import AbstractList from './AbstractList';
import User from 'flarum/common/models/User';

export default class UserList extends AbstractList {
    head() {
        const columns = super.head();

        columns.add('email', m('th', app.translator.trans('flamarkt-core.backoffice.users.head.email')), 10);

        return columns;
    }

    columns(user: User) {
        const columns = super.columns(user);

        columns.add('email', m('td', user.email()), 10);

        return columns;
    }

    actions(user: User) {
        const actions = super.actions(user);

        actions.add('edit', LinkButton.component({
            className: 'Button Button--icon',
            icon: 'fas fa-pen',
            href: app.route.user(user),
        }));

        return actions;
    }
}
