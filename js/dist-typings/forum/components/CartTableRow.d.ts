/// <reference types="mithril" />
import Component, { ComponentAttrs } from 'flarum/common/Component';
import Product from '../../common/models/Product';
import ItemList from 'flarum/common/utils/ItemList';
interface CartTableRowAttrs extends ComponentAttrs {
    product: Product;
}
export default class CartTableRow extends Component<CartTableRowAttrs> {
    view(): import("mithril").Vnode<any, any>;
    columns(): ItemList;
}
export {};
