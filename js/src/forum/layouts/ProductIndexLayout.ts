import AbstractShopLayout, {AbstractShopLayoutAttrs} from './AbstractShopLayout';
import Link from 'flarum/common/components/Link';
import ProductListState from '../../common/states/ProductListState';

export interface ProductIndexLayoutAttrs extends AbstractShopLayoutAttrs {
    state: ProductListState,
}

export default class ProductIndexLayout extends AbstractShopLayout<ProductIndexLayoutAttrs> {
    className() {
        return 'ProductIndexPage';
    }

    title() {
        return 'Products';
    }

    content() {
        return m('ul', this.attrs.state.pages.map(page => page.items.map(product => m('li', m(Link, {
            href: app.route.product(product),
        }, product.title())))));
    }
}
