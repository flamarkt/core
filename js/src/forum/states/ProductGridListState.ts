import ProductListState from '../../common/states/ProductListState';

export default class ProductGridListState extends ProductListState {
    limit(): number {
        // Divides by 1/2/3/4, making it better for grid layouts
        return 24;
    }
}
