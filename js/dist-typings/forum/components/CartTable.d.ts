import Component, { ComponentAttrs } from 'flarum/common/Component';
import ItemList from 'flarum/common/utils/ItemList';
import Cart from '../../common/models/Cart';
import Product from '../../common/models/Product';
interface CartTableAttrs extends ComponentAttrs {
    cart: Cart;
}
export default class CartTable extends Component<CartTableAttrs> {
    view(): any;
    head(): ItemList<any>;
    rows(): ItemList<any>;
    productRowKey(product: Product): string;
    productRowPriority(product: Product): number;
}
export {};
