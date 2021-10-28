import * as Mithril from 'mithril';
import Component, { ComponentAttrs } from 'flarum/common/Component';
import Product from '../../common/models/Product';
interface ProductQuantityAttrs extends ComponentAttrs {
    product: Product;
}
export default class ProductQuantity extends Component<ProductQuantityAttrs> {
    cartQuantity: number;
    savingQuantity: boolean;
    oninit(vnode: Mithril.Vnode<ProductQuantityAttrs, this>): void;
    view(): Mithril.Vnode<any, any>;
}
export {};
