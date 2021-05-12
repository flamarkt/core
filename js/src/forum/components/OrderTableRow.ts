import Component, {ComponentAttrs} from 'flarum/common/Component';
import OrderLine from '../../common/models/OrderLine';
import ItemList from 'flarum/common/utils/ItemList';
import formatPrice from "../../common/helpers/formatPrice";

interface OrderTableRowAttrs extends ComponentAttrs {
    line: OrderLine,
}

export default class OrderTableRow extends Component<OrderTableRowAttrs> {
    view() {
        return m('tr', this.columns().toArray());
    }

    columns(): ItemList {
        const columns = new ItemList();

        const {line} = this.attrs;

        columns.add('number', m('td', line.number()));
        columns.add('product', m('td', ''));//TODO
        columns.add('priceUnit', m('td', formatPrice(line.priceUnit())));
        columns.add('quantity', m('td', line.quantity()));
        columns.add('priceTotal', m('td', formatPrice(line.priceTotal())));

        return columns;
    }
}
