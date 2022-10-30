import {Vnode} from 'mithril';
import app from 'flamarkt/backoffice/backoffice/app';
import SearchInput from 'flamarkt/backoffice/backoffice/components/SearchInput';
import Page from 'flarum/common/components/Page';
import LinkButton from 'flarum/common/components/LinkButton';
import extractText from 'flarum/common/utils/extractText';
import ItemList from 'flarum/common/utils/ItemList';
import ProductList from '../components/ProductList';
import ProductListState from '../../common/states/ProductListState';
import ProductSortDropdown from '../../common/components/ProductSortDropdown';

export default class ProductIndexPage extends Page {
    list!: ProductListState;

    oninit(vnode: Vnode) {
        super.oninit(vnode);

        this.list = this.initState();
        this.list.refresh();

        app.setTitle(extractText(app.translator.trans('flamarkt-core.backoffice.products.title')));
        app.setTitleCount(0);
    }

    initState() {
        const params = m.route.param();

        return new ProductListState({
            sort: params.sort,
        });
    }

    filters() {
        const items = new ItemList();

        items.add('sort', m(ProductSortDropdown, {
            list: this.list,
        }), 100);

        items.add('search', m(SearchInput, {
            initialValue: '',
            onchange: (value: string) => {
                this.list.params.q = value;
                this.list.refresh();
            },
            placeholder: extractText(app.translator.trans('flamarkt-core.backoffice.products.searchPlaceholder')),
        }), 50);

        items.add('separator', m('.BackofficeListFilters--separator'), -10);

        items.add('new', LinkButton.component({
            className: 'Button',
            href: app.route('products.show', {
                id: 'new',
            }),
        }, app.translator.trans('flamarkt-core.backoffice.products.new')), -100);

        return items;
    }

    view() {
        return m('.ProductIndexPage', m('.container', [
            m('.BackofficeListFilters', this.filters().toArray()),
            m(ProductList, {
                list: this.list,
            }),
        ]));
    }
}
