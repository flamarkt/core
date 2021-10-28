import AbstractList from './AbstractList';
import Order from '../../common/models/Order';
export default class OrderList extends AbstractList<Order> {
    head(): import("flarum/common/utils/ItemList").default;
    columns(order: Order): import("flarum/common/utils/ItemList").default;
    actions(order: Order): import("flarum/common/utils/ItemList").default;
}
