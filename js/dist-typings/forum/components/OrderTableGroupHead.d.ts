import Component, { ComponentAttrs } from 'flarum/common/Component';
import OrderLine from '../../common/models/OrderLine';
import ItemList from 'flarum/common/utils/ItemList';
import Order from '../../common/models/Order';
interface OrderTableGroupHeadAttrs extends ComponentAttrs {
    group: string;
    lines: OrderLine[];
    order: Order;
}
export default class OrderTableGroupHead extends Component<OrderTableGroupHeadAttrs> {
    view(): any;
    visible(): boolean;
    columns(): ItemList<any>;
}
export {};
