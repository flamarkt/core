import {VnodeDOM} from 'mithril';
import app from 'flarum/forum/app';
import Page from 'flarum/common/components/Page';
import extractText from 'flarum/common/utils/extractText';
import AccountLayout from '../layouts/AccountLayout';

export default class AccountPage extends Page {
    oncreate(vnode: VnodeDOM) {
        super.oncreate(vnode);

        app.setTitle(extractText(app.translator.trans('flamarkt-core.forum.account.browserTitle')));
        app.setTitleCount(0);
    }

    view() {
        return AccountLayout.component();
    }
}
