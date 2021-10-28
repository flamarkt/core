/// <reference types="mithril" />
import Component, { ComponentAttrs } from 'flarum/common/Component';
import OrderLine from '../../common/models/OrderLine';
import ItemList from 'flarum/common/utils/ItemList';
interface OrderTableGroupFootAttrs extends ComponentAttrs {
    group: string | null;
    lines: OrderLine[];
}
export default class OrderTableGroupFoot extends Component<OrderTableGroupFootAttrs> {
    view(): import("mithril").Vnode<any, any> | null;
    visible(): boolean;
    subtotal(): number;
    columns(): ItemList;
}
export {};
