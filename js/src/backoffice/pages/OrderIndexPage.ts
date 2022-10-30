import {Vnode} from 'mithril';
import app from 'flamarkt/backoffice/backoffice/app';
import SearchInput from 'flamarkt/backoffice/backoffice/components/SearchInput';
import Page from 'flarum/common/components/Page';
import LinkButton from 'flarum/common/components/LinkButton';
import extractText from 'flarum/common/utils/extractText';
import ItemList from 'flarum/common/utils/ItemList';
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

    filters() {
        const items = new ItemList();

        items.add('sort', m(OrderSortDropdown, {
            list: this.list,
        }), 100);

        items.add('search', m(SearchInput, {
            initialValue: '',
            onchange: (value: string) => {
                this.list.params.q = value;
                this.list.refresh();
            },
            placeholder: extractText(app.translator.trans('flamarkt-core.backoffice.orders.searchPlaceholder')),
        }), 50);

        items.add('separator', m('.BackofficeListFilters--separator'), -10);

        items.add('new', LinkButton.component({
            className: 'Button',
            href: app.route('orders.show', {
                id: 'new',
            }),
        }, app.translator.trans('flamarkt-core.backoffice.orders.new')), -100);

        return items;
    }

    view() {
        return m('.OrderIndexPage', m('.container', [
            m('.BackofficeListFilters', this.filters().toArray()),
            m(OrderList, {
                list: this.list,
            }),
        ]));
    }
}
