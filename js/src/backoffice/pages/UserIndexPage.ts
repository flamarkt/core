import Page from 'flarum/common/components/Page';
import LinkButton from 'flarum/common/components/LinkButton';
import UserListState from '../states/UserListState';
import UserList from '../components/UserList';
import UserSortDropdown from '../components/UserSortDropdown';

export default class UserIndexPage extends Page {
    state!: UserListState;

    oninit(vnode) {
        super.oninit(vnode);

        this.state = new UserListState();
        this.state.refresh();
    }

    view() {
        return m('.UserIndexPage', m('.container', [
            m('.Form-group', [
                LinkButton.component({
                    className: 'Button',
                    href: app.route('users.show', {
                        id: 'new',
                    }),
                }, app.translator.trans('flamarkt-core.backoffice.users.new')),
                m(UserSortDropdown, {
                    state: this.state,
                }),
            ]),
            m(UserList, {
                state: this.state,
            }),
        ]));
    }
}
