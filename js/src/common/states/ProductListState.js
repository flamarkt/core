import AbstractListState from './AbstractListState';

export default class ProductListState extends AbstractListState {
    type() {
        return 'flamarkt/products';
    }
}
