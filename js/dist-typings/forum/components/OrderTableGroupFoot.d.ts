import Component, { ComponentAttrs } from 'flarum/common/Component';
import OrderLine from '../../common/models/OrderLine';
import ItemList from 'flarum/common/utils/ItemList';
import Order from '../../common/models/Order';
interface OrderTableGroupFootAttrs extends ComponentAttrs {
    group: string;
    lines: OrderLine[];
    order: Order;
}
export default class OrderTableGroupFoot extends Component<OrderTableGroupFootAttrs> {
    view(): any;
    visible(): boolean;
    subtotal(): number;
    columns(): ItemList<any>;
}
export {};
