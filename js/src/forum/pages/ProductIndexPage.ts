import Page from 'flarum/common/components/Page';
import ProductListState from '../../common/states/ProductListState';
import Link from 'flarum/common/components/Link';

export default class ProductIndexPage extends Page {
    state!: ProductListState;

    oninit() {
        this.state = new ProductListState();
        this.state.refresh();
    }

    view() {
        return m('div', [
            m('h1', 'Products'),
            m('ul', this.state.pages.map(page => page.items.map(product => m('li', m(Link, {
                href: app.route('products.show', {
                    id: product.id(),
                }),
            }, product.title()))))),
        ]);
    }
}
