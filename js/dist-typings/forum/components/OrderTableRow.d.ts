import Component, { ComponentAttrs } from 'flarum/common/Component';
import OrderLine from '../../common/models/OrderLine';
import ItemList from 'flarum/common/utils/ItemList';
import Order from '../../common/models/Order';
interface OrderTableRowAttrs extends ComponentAttrs {
    line: OrderLine;
    order: Order;
}
export default class OrderTableRow extends Component<OrderTableRowAttrs> {
    view(): any;
    columns(): ItemList<any>;
    productContent(): any[];
    labelContent(): any;
    commentContent(): any;
}
export {};
