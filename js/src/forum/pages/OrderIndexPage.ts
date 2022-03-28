import {Vnode} from 'mithril';
import app from 'flarum/forum/app';
import Page from 'flarum/common/components/Page';
import extractText from 'flarum/common/utils/extractText';
import OrderListState from '../../common/states/OrderListState';
import OrderIndexLayout from '../layouts/OrderIndexLayout';

export default class OrderIndexPage extends Page {
    state!: OrderListState;

    oninit(vnode: Vnode) {
        super.oninit(vnode);

        this.state = this.initState();
        this.state.refresh();

        app.setTitle(extractText(app.translator.trans('flamarkt-core.forum.orders.browserTitle')));
        app.setTitleCount(0);
    }

    initState() {
        return new OrderListState({
            filter: {
                user: app.session.user ? app.session.user.id() : 0,
            },
        });
    }

    view() {
        return OrderIndexLayout.component({
            state: this.state,
        });
    }
}
