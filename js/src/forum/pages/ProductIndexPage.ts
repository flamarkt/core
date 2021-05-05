import ProductListState from '../../common/states/ProductListState';
import Link from 'flarum/common/components/Link';
import AbstractShopPage from './AbstractShopPage';

export default class ProductIndexPage extends AbstractShopPage {
    state!: ProductListState;

    oninit(vnode) {
        super.oninit(vnode);

        this.state = new ProductListState();
        this.state.refresh();
    }

    breadcrumbItems() {
        const items = super.breadcrumbItems();

        items.add('current', m('span.breadcrumb-current', 'Products'));

        return items;
    }

    content() {
        return m('div', [
            m('h1', 'Products'),
            m('ul', this.state.pages.map(page => page.items.map(product => m('li', m(Link, {
                href: app.route('flamarkt.products.show', {
                    id: product.id(),
                }),
            }, product.title()))))),
        ]);
    }
}
