import AbstractList from 'flamarkt/backoffice/backoffice/components/AbstractList';
import Product from '../../common/models/Product';
export default class ProductList extends AbstractList<Product> {
    head(): import("flarum/common/utils/ItemList").default<any>;
    columns(product: Product): import("flarum/common/utils/ItemList").default<any>;
    actions(product: Product): import("flarum/common/utils/ItemList").default<any>;
}
