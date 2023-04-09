import app from 'flarum/forum/app';
import Component, {ComponentAttrs} from 'flarum/common/Component';
import OrderLine from '../../common/models/OrderLine';
import ItemList from 'flarum/common/utils/ItemList';
import PriceLabel from '../../common/components/PriceLabel';
import Order from '../../common/models/Order';

interface OrderTableGroupFootAttrs extends ComponentAttrs {
    group: string // Null is replaced by "default" in this parameter
    lines: OrderLine[]
    order: Order
}

export default class OrderTableGroupFoot extends Component<OrderTableGroupFootAttrs> {
    view() {
        if (!this.visible()) {
            return null;
        }

        return m('tr', this.columns().toArray());
    }

    visible(): boolean {
        // If there are any non-default groups, enable the footer for the default group
        return (this.attrs.order.lines() || []).some(line => line && line.group() !== null) && this.attrs.group === 'default';
    }

    subtotal(): number {
        return this.attrs.lines.reduce((subtotal, line) => subtotal + (line.priceTotal() || 0), 0);
    }

    columns(): ItemList<any> {
        const columns = new ItemList();

        columns.add('number', m('th'), 100);
        columns.add('product', m('th', app.translator.trans('flamarkt-core.forum.order.table.groupTotal')), 30);
        columns.add('priceUnit', m('th'), -30);
        columns.add('quantity', m('th'), -60);
        columns.add('priceTotal', m('th', m(PriceLabel, {
            value: this.subtotal(),
            hint: 'order group subtotal',
        })), -90);

        return columns;
    }
}
