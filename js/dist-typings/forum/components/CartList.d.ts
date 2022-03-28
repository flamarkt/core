import Component, { ComponentAttrs } from 'flarum/common/Component';
import CartState from '../states/CartState';
import ItemList from 'flarum/common/utils/ItemList';
interface CartListAttrs extends ComponentAttrs {
    state: CartState;
}
export default class CartList extends Component<CartListAttrs> {
    attrs: CartListAttrs;
    view(): any;
    items(): ItemList<any>;
}
export {};
