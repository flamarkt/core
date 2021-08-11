import Component, {ComponentAttrs} from 'flarum/common/Component';
import Button from 'flarum/common/components/Button';
import Link from 'flarum/common/components/Link';
import Product from '../../common/models/Product';
import ItemList from 'flarum/common/utils/ItemList';
import formatPrice from '../../common/helpers/formatPrice';

interface CartTableRowAttrs extends ComponentAttrs {
    product: Product,
}

export default class CartTableRow extends Component<CartTableRowAttrs> {
    view() {
        return m('tr', this.columns().toArray());
    }

    columns(): ItemList {
        const columns = new ItemList();

        columns.add('product', m('td', m(Link, {
            href: app.route.product(this.attrs.product),
        }, this.attrs.product.title())));
        columns.add('quantity', m('td', m('input.FormControl', {
            type: 'number',
            value: this.attrs.product.cartQuantity(),
        })));
        columns.add('total', m('td', formatPrice(this.attrs.product.cartPriceTotalLocal())));
        columns.add('delete', m('td', Button.component({
            className: 'Button Button--icon',
            icon: 'fas fa-times',
        })));

        return columns;
    }
}
