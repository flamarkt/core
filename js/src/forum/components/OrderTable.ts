import Component, {ComponentAttrs} from 'flarum/common/Component';
import ItemList from 'flarum/common/utils/ItemList';
import Product from '../../common/models/Product';
import Order from '../../common/models/Order';
import OrderTableRow from './OrderTableRow';

interface OrderTableAttrs extends ComponentAttrs {
    order: Order,
}

export default class OrderTable extends Component<OrderTableAttrs> {
    view() {
        //TODO: use own className
        return m('table.CartTable', [
            m('thead', m('tr', this.head().toArray())),
            m('tbody', this.rows().toArray()),
        ]);
    }

    head(): ItemList {
        const columns = new ItemList();

        columns.add('number', m('th')); // Empty on purpose
        columns.add('product', m('th', 'Product'));
        columns.add('priceUnit', m('th', 'Price'));
        columns.add('quantity', m('th', 'Quantity'));
        columns.add('priceTotal', m('th', 'Total'));

        return columns;
    }

    rows(): ItemList {
        const rows = new ItemList();

        (this.attrs.order.lines() || []).forEach(line => {
            rows.add('line-' + line.id(), OrderTableRow.component({
                line,
            }));
        });

        return rows;
    }
}
