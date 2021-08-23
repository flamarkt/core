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

    head(): ItemList {
        const columns = new ItemList();

        columns.add('number', m('th'), 100); // Empty on purpose
        columns.add('product', m('th', 'Product'), 30);
        columns.add('priceUnit', m('th', 'Price'), -30);
        columns.add('quantity', m('th', 'Quantity'), -60);
        columns.add('priceTotal', m('th', 'Total'), -90);

        return columns;
    }

    foot(): ItemList {
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

    rows(): ItemList {
        const rows = new ItemList();

        let isFirstGroup = true;
        let group: string | null = '__not_exists';
        let linesInGroup: OrderLine[] = [];

        (this.attrs.order.lines() || []).forEach(line => {
            if (line.group() !== group) {
                if (!isFirstGroup) {
                    rows.add('group-foot-' + group, m(OrderTableGroupFoot, {
                        group,
                        lines: linesInGroup,
                    }));
                }

                group = line.group() as string;
                linesInGroup = [];

                rows.add('group-head-' + group, m(OrderTableGroupHead, {
                    group,
                    line: [], // TODO: needs to pre-compute the list of lines to have them for the head
                }));
            }

            rows.add('line-' + line.id(), OrderTableRow.component({
                line,
            }));
            linesInGroup.push(line);

            isFirstGroup = false;
        });

        if (!isFirstGroup) {
            rows.add('group-foot-' + group, m(OrderTableGroupFoot, {
                group,
                lines: linesInGroup,
            }));
        }

        return rows;
    }
}
