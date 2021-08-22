import Component, {ComponentAttrs} from 'flarum/common/Component';
import OrderLine from '../../common/models/OrderLine';
import ItemList from 'flarum/common/utils/ItemList';
import PriceLabel from '../../common/components/PriceLabel';

interface OrderTableGroupFootAttrs extends ComponentAttrs {
    group: string | null
    lines: OrderLine[]
}

export default class OrderTableGroupFoot extends Component<OrderTableGroupFootAttrs> {
    view() {
        if (!this.visible()) {
            return null;
        }

        return m('tr', this.columns().toArray());
    }

    visible(): boolean {
        return this.attrs.group === null;
    }

    subtotal(): number {
        return this.attrs.lines.reduce((subtotal, line) => subtotal + (line.priceTotal() || 0), 0);
    }

    columns(): ItemList {
        const columns = new ItemList();

        columns.add('number', m('th'), 100);
        columns.add('product', m('th', 'Subtotal'), 30);
        columns.add('priceUnit', m('th'), -30);
        columns.add('quantity', m('th'), -60);
        columns.add('priceTotal', m('th', m(PriceLabel, {
            value: this.subtotal(),
            hint: 'order group subtotal',
        })), -90);

        return columns;
    }
}
