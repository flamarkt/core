import Component, {ComponentAttrs} from 'flarum/common/Component';
import ItemList from 'flarum/common/utils/ItemList';
import CartTableRow from './CartTableRow';
import Cart from '../../common/models/Cart';
import Product from '../../common/models/Product';
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

    head(): ItemList<any> {
        const columns = new ItemList();

        columns.add('product', m('th', 'Product'), 200);
        columns.add('quantity', m('th', 'Quantity'), 100);
        columns.add('total', m('th', 'Total'), -100);
        columns.add('actions', m('th'), -200); // Empty on purpose

        return columns;
    }

    rows(): ItemList<any> {
        const rows = new ItemList();

        const products = this.attrs.cart.products() || [];

        products.forEach(product => {
            if (!product) {
                return;
            }

            rows.add(this.productRowKey(product), CartTableRow.component({
                product,
            }), this.productRowPriority(product));
        });

        if (products.length === 0) {
            rows.add('empty', m('tr', m('td', {
                colspan: 100,
            }, 'Cart is empty')), -100);
        } else {
            rows.add('total', m('tr', [
                m('th', {
                    colspan: 2,
                }, 'Total'),
                m('th', m(PriceLabel, {
                    value: this.attrs.cart.priceTotalLocal(),
                    hint: 'cart total',
                })),
                m('th'),
            ]), -100);
        }

        return rows;
    }

    productRowKey(product: Product): string {
        return 'product-' + product.id();
    }

    productRowPriority(product: Product): number {
        return 0;
    }
}
