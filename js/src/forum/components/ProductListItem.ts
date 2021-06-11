import {Children} from 'mithril';
import Component, {ComponentAttrs} from 'flarum/common/Component';
import ItemList from 'flarum/common/utils/ItemList';
import Link from 'flarum/common/components/Link';
import Product from '../../common/models/Product';
import formatPrice from '../../common/helpers/formatPrice';

interface ProductListItemAttrs extends ComponentAttrs {
    product: Product,
}

export default class ProductListItem extends Component<ProductListItemAttrs> {
    view() {
        return m('li.ProductListItem', this.link(this.items().toArray()));
    }

    link(children: Children) {
        return m(Link, {
            className: 'ProductListItem--link',
            href: app.route.product(this.attrs.product),
        }, children);
    }

    items(): ItemList {
        const items = new ItemList();

        const {product} = this.attrs;

        items.add('price', m('span.ProductListItem--price', formatPrice(product.price())), 20);
        items.add('title', m('span.ProductListItem--title', product.title()), 10);

        return items;
    }
}
