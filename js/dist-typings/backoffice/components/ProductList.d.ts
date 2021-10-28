import AbstractList from './AbstractList';
import Product from '../../common/models/Product';
export default class ProductList extends AbstractList<Product> {
    head(): import("flarum/common/utils/ItemList").default;
    columns(product: Product): import("flarum/common/utils/ItemList").default;
    actions(product: Product): import("flarum/common/utils/ItemList").default;
}
