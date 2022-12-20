import Component, { ComponentAttrs } from 'flarum/common/Component';
import ItemList from 'flarum/common/utils/ItemList';
import Order from '../../common/models/Order';
import OrderLine from '../../common/models/OrderLine';
interface OrderTableAttrs extends ComponentAttrs {
    order: Order;
}
export default class OrderTable extends Component<OrderTableAttrs> {
    view(): any;
    head(): ItemList<any>;
    foot(): ItemList<any>;
    rows(): ItemList<any>;
    lineKey(line: OrderLine): string;
    linePriority(line: OrderLine): number;
    lineHeadPriority(group: string): number;
    lineFootPriority(group: string): number;
}
export {};
