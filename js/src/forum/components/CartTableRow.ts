import app from 'flarum/forum/app';
import Component, {ComponentAttrs} from 'flarum/common/Component';
import Button from 'flarum/common/components/Button';
import Link from 'flarum/common/components/Link';
import Product from '../../common/models/Product';
import ItemList from 'flarum/common/utils/ItemList';
import QuantityInput from '../../common/components/QuantityInput';
import PriceLabel from '../../common/components/PriceLabel';

interface CartTableRowAttrs extends ComponentAttrs {
    product: Product,
}

export default class CartTableRow extends Component<CartTableRowAttrs> {
    view() {
        return m('tr', this.columns().toArray());
    }

    columns(): ItemList<any> {
        const columns = new ItemList();

        const {product} = this.attrs;

        columns.add('product', m('td', m(Link, {
            href: app.route.product(product),
        }, product.title())));
        columns.add('quantity', m('td', m(QuantityInput, {
            value: this.attrs.product.cartQuantity(),
            onchange: (value: number) => {
                //TODO
            },
            product,
        })));
        columns.add('total', m('td', m(PriceLabel, {
            value: product.cartPriceTotalLocal(),
            hint: 'cart product total',
            product,
        })));
        columns.add('delete', m('td', Button.component({
            className: 'Button Button--icon',
            icon: 'fas fa-times',
        })));

        return columns;
    }
}
