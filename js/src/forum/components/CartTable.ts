import Component, {ComponentAttrs} from 'flarum/common/Component';
import ItemList from 'flarum/common/utils/ItemList';
import CartTableRow from './CartTableRow';
import Cart from '../../common/models/Cart';
import PriceLabel from '../../common/components/PriceLabel';

interface CartTableAttrs extends ComponentAttrs {
    cart: Cart,
}

export default class CartTable extends Component<CartTableAttrs> {
    view() {
        return m('table.CartTable', [
            m('thead', m('tr', this.head().toArray())),
            m('tbody', this.rows().toArray()),
        ]);
    }

    head(): ItemList {
        const columns = new ItemList();

        columns.add('product', m('th', 'Product'));
        columns.add('quantity', m('th', 'Quantity'));
        columns.add('total', m('th', 'Total'));
        columns.add('actions', m('th',)); // Empty on purpose

        return columns;
    }

    rows(): ItemList {
        const rows = new ItemList();

        const products = this.attrs.cart.products() || [];

        products.forEach(product => {
            rows.add('product-' + product.id(), CartTableRow.component({
                product,
            }));
        });

        if (products.length === 0) {
            rows.add('empty', m('tr', m('td', {
                colspan: 100,
            }, 'Cart is empty')));
        } else {
            rows.add('total', m('tr', [
                m('th', {
                    colspan: 2,
                }, 'Total'),
                m('th', m(PriceLabel, {
                    value: this.attrs.cart.priceTotalLocal(),
                    hint: 'cart total',
                })),
            ]));
        }

        return rows;
    }
}
