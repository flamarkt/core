import {VnodeDOM} from 'mithril';
import Page from 'flarum/common/components/Page';
import AccountLayout from '../layouts/AccountLayout';

export default class AccountPage extends Page {
    oncreate(vnode: VnodeDOM) {
        super.oncreate(vnode);

        app.setTitle(app.translator.trans('flamarkt-core.forum.account.browserTitle'));
        app.setTitleCount(0);
    }

    view() {
        return AccountLayout.component();
    }
}
