import AbstractList from 'flamarkt/backoffice/backoffice/components/AbstractList';
import Order from '../../common/models/Order';
export default class OrderList extends AbstractList<Order> {
    head(): import("flarum/common/utils/ItemList").default<any>;
    columns(order: Order): import("flarum/common/utils/ItemList").default<any>;
    actions(order: Order): import("flarum/common/utils/ItemList").default<any>;
}
