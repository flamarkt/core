import {Vnode} from 'mithril';
import app from 'flamarkt/backoffice/backoffice/app';
import Page from 'flarum/common/components/Page';
import LinkButton from 'flarum/common/components/LinkButton';
import extractText from 'flarum/common/utils/extractText';
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

    view() {
        return m('.ProductIndexPage', m('.container', [
            m('.Form-group', [
                LinkButton.component({
                    className: 'Button',
                    href: app.route('products.show', {
                        id: 'new',
                    }),
                }, app.translator.trans('flamarkt-core.backoffice.products.new')),
                m(ProductSortDropdown, {
                    state: this.list,
                }),
            ]),
            m(ProductList, {
                state: this.list,
            }),
        ]));
    }
}
