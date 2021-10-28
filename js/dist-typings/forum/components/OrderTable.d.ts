/// <reference types="mithril" />
import Component, { ComponentAttrs } from 'flarum/common/Component';
import ItemList from 'flarum/common/utils/ItemList';
import Order from '../../common/models/Order';
interface OrderTableAttrs extends ComponentAttrs {
    order: Order;
}
export default class OrderTable extends Component<OrderTableAttrs> {
    view(): import("mithril").Vnode<any, any>;
    head(): ItemList;
    foot(): ItemList;
    rows(): ItemList;
}
export {};
