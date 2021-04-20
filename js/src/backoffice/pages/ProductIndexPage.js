import Page from 'flarum/common/components/Page';
import LinkButton from 'flarum/common/components/LinkButton';
import ProductList from '../components/ProductList';
import ProductListState from '../../common/states/ProductListState';

/* global m */

export default class ProductIndexPage extends Page {
    oninit() {
        this.state = new ProductListState();
        this.state.refresh();
    }

    view() {
        return m('.ProductIndexPage', [
            m('.Form-group', [
                LinkButton.component({
                    className: 'Button',
                    href: app.route('products.show', {
                        id: 'new',
                    }),
                }, 'New product' /* TODO */),
            ]),
            m(ProductList, {
                state: this.state,
            }),
        ]);
    }
}
