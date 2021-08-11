import {Vnode} from 'mithril';
import Page from 'flarum/common/components/Page';
import LinkButton from 'flarum/common/components/LinkButton';
import UserListState from '../states/UserListState';
import UserList from '../components/UserList';
import UserSortDropdown from '../components/UserSortDropdown';

export default class UserIndexPage extends Page {
    state!: UserListState;

    oninit(vnode: Vnode) {
        super.oninit(vnode);

        this.state = this.initState();
        this.state.refresh();
    }

    initState() {
        const params = m.route.param();

        return new UserListState({
            sort: params.sort,
        });
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
