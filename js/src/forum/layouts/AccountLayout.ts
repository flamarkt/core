import app from 'flarum/forum/app';
import AbstractAccountLayout from './AbstractAccountLayout';
import AccountControls from '../utils/AccountControls';
import listItems from 'flarum/common/helpers/listItems';

export default class AccountLayout extends AbstractAccountLayout {
    className() {
        return 'AccountPage';
    }

    title() {
        return app.translator.trans('flamarkt-core.forum.account.headingTitle');
    }

    currentPageHref(): string {
        return app.route('flamarkt.account');
    }

    content() {
        if (!app.session.user) {
            return null;
        }

        return m('ul', listItems(AccountControls.controls(app.session.user).toArray()));
    }
}
