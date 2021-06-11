import Page from 'flarum/common/components/Page';
import LinkButton from 'flarum/common/components/LinkButton';
import ProductList from '../components/ProductList';
import ProductListState from '../../common/states/ProductListState';
import ProductSortDropdown from '../../common/components/ProductSortDropdown';

export default class ProductIndexPage extends Page {
    state!: ProductListState;

    oninit(vnode) {
        super.oninit(vnode);

        this.state = new ProductListState();
        this.state.refresh();
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
