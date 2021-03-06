import Component, { ComponentAttrs } from 'flarum/common/Component';
import ItemList from 'flarum/common/utils/ItemList';
import Cart from '../../common/models/Cart';
interface CartTableAttrs extends ComponentAttrs {
    cart: Cart;
}
export default class CartTable extends Component<CartTableAttrs> {
    view(): any;
    head(): ItemList<any>;
    rows(): ItemList<any>;
}
export {};
