import { Children } from 'mithril';
import Component, { ComponentAttrs } from 'flarum/common/Component';
import ItemList from 'flarum/common/utils/ItemList';
import Product from '../../common/models/Product';
interface ProductListItemAttrs extends ComponentAttrs {
    product: Product;
}
export default class ProductListItem extends Component<ProductListItemAttrs> {
    view(): any;
    link(children: Children): any;
    items(): ItemList<any>;
}
export {};
