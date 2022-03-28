import AbstractListState from 'flamarkt/backoffice/common/states/AbstractListState';
import Product from '../models/Product';

export default class ProductListState extends AbstractListState<Product> {
    type() {
        return 'flamarkt/products';
    }
}
