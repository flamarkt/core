import { Attributes, ClassComponent, Vnode } from 'mithril';
import ItemList from 'flarum/common/utils/ItemList';
import OrderLineEditState from '../states/OrderLineEditState';
interface OrderLineAttrs extends Attributes {
    line: OrderLineEditState;
    sortable?: boolean;
    control: Vnode;
    onchange: () => void;
}
export default class OrderLineEdit implements ClassComponent<OrderLineAttrs> {
    view(vnode: Vnode<OrderLineAttrs>): any;
    columns(line: OrderLineEditState, control: Vnode, onchange: () => void, sortable?: boolean): ItemList<any>;
    showInfoProduct(line: OrderLineEditState): boolean;
    showInfoLabel(line: OrderLineEditState): boolean;
    showInfoComment(line: OrderLineEditState): boolean;
    fields(line: OrderLineEditState, onchange: () => void): ItemList<any>;
}
export {};
