import {Vnode} from 'mithril';
import app from 'flamarkt/backoffice/backoffice/app';
import Page from 'flarum/common/components/Page';
import LinkButton from 'flarum/common/components/LinkButton';
import extractText from 'flarum/common/utils/extractText';
import OrderListState from '../../common/states/OrderListState';
import OrderList from '../components/OrderList';
import OrderSortDropdown from '../../common/components/OrderSortDropdown';

export default class OrderIndexPage extends Page {
    list!: OrderListState;

    oninit(vnode: Vnode) {
        super.oninit(vnode);

        this.list = this.initState();
        this.list.refresh();

        app.setTitle(extractText(app.translator.trans('flamarkt-core.backoffice.orders.title')));
        app.setTitleCount(0);
    }

    initState() {
        const pageParams = m.route.param();

        const params: any = {
            sort: pageParams.sort,
        }

        if (pageParams.user) {
            params.filter = params.filter || {};
            params.filter.user = pageParams.user;
        }

        return new OrderListState(params);
    }

    view() {
        return m('.OrderIndexPage', m('.container', [
            m('.Form-group', [
                LinkButton.component({
                    className: 'Button',
                    href: app.route('orders.show', {
                        id: 'new',
                    }),
                }, app.translator.trans('flamarkt-core.backoffice.orders.new')),
                m(OrderSortDropdown, {
                    state: this.list,
                }),
            ]),
            m(OrderList, {
                state: this.list,
            }),
        ]));
    }
}
