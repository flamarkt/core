import {Vnode} from 'mithril';
import Page from 'flarum/common/components/Page';
import LinkButton from 'flarum/common/components/LinkButton';
import ProductList from '../components/ProductList';
import ProductListState from '../../common/states/ProductListState';
import ProductSortDropdown from '../../common/components/ProductSortDropdown';

export default class ProductIndexPage extends Page {
    state!: ProductListState;

    oninit(vnode: Vnode) {
        super.oninit(vnode);

        this.state = this.initState();
        this.state.refresh();

        app.setTitle(app.translator.trans('flamarkt-core.backoffice.products.title'));
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
                    state: this.state,
                }),
            ]),
            m(ProductList, {
                state: this.state,
            }),
        ]));
    }
}
