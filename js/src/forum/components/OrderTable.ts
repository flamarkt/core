import Component, {ComponentAttrs} from 'flarum/common/Component';
import ItemList from 'flarum/common/utils/ItemList';
import Product from '../../common/models/Product';
import Order from '../../common/models/Order';
import OrderTableRow from './OrderTableRow';
import OrderTableGroupHead from './OrderTableGroupHead';
import OrderTableGroupFoot from './OrderTableGroupFoot';
import OrderLine from '../../common/models/OrderLine';
import PriceLabel from '../../common/components/PriceLabel';

interface OrderTableAttrs extends ComponentAttrs {
    order: Order,
}

export default class OrderTable extends Component<OrderTableAttrs> {
    view() {
        //TODO: use own className
        return m('table.CartTable', [
            m('thead', m('tr', this.head().toArray())),
            m('tbody', this.rows().toArray()),
            m('tfoot', m('tr', this.foot().toArray())),
        ]);
    }

    head(): ItemList<any> {
        const columns = new ItemList();

        columns.add('number', m('th'), 100); // Empty on purpose
        columns.add('product', m('th', 'Product'), 30);
        columns.add('priceUnit', m('th', 'Price'), -30);
        columns.add('quantity', m('th', 'Quantity'), -60);
        columns.add('priceTotal', m('th', 'Total'), -90);

        return columns;
    }

    foot(): ItemList<any> {
        const columns = new ItemList();

        columns.add('number', m('th'), 100);
        columns.add('product', m('th', 'Total'), 30);
        columns.add('priceUnit', m('th'), -30);
        columns.add('quantity', m('th'), -60);
        columns.add('priceTotal', m('th', m(PriceLabel, {
            value: this.attrs.order.priceTotal(),
            hint: 'order foot total',
        })), -90);

        return columns;
    }

    rows(): ItemList<any> {
        const rows = new ItemList();

        const {order} = this.attrs;
        let isFirstGroup = true;
        let group: string = '__not_exists';
        let linesInGroup: OrderLine[] = [];

        (order.lines() || []).forEach(line => {
            if (!line) {
                return;
            }

            const thisLineGroup = line.group() || 'default';

            if (thisLineGroup !== group) {
                if (!isFirstGroup) {
                    rows.add('group-foot-' + group /* previous group value */, m(OrderTableGroupFoot, {
                        group,
                        lines: linesInGroup,
                        order,
                    }), this.lineFootPriority(group));
                }

                group = thisLineGroup;
                linesInGroup = [];

                rows.add('group-head-' + group, m(OrderTableGroupHead, {
                    group,
                    line: [], // TODO: needs to pre-compute the list of lines to have them for the head
                    order,
                }), this.lineHeadPriority(group));
            }

            rows.add(this.lineKey(line), OrderTableRow.component({
                line,
                order,
            }), this.linePriority(line));
            linesInGroup.push(line);

            isFirstGroup = false;
        });

        // If there were no lines, isFirstGroup will still be false
        // In that case we wouldn't have any group name to use so we'll skip since the page will be empty anyway
        if (!isFirstGroup) {
            rows.add('group-foot-' + group, m(OrderTableGroupFoot, {
                group,
                lines: linesInGroup,
                order,
            }), this.lineFootPriority(group));
        }

        return rows;
    }

    lineKey(line: OrderLine) {
        return 'line-' + line.id();
    }

    linePriority(line: OrderLine) {
        return 0;
    }

    lineHeadPriority(group: string) {
        return 0;
    }

    lineFootPriority(group: string) {
        return 0;
    }
}
