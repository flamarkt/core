import AbstractSortDropdown, {SortDropdownAttrs, SortOptions} from './AbstractSortDropdown';
import ProductListState from '../states/ProductListState';

export interface ProductSortDropdownAttrs extends SortDropdownAttrs {
    state: ProductListState
}

export default class ProductSortDropdown extends AbstractSortDropdown<ProductSortDropdownAttrs> {
    className(): string {
        return 'ProductSortDropdown';
    }

    options(): SortOptions {
        return {
            '-createdAt': 'Newest',
            'createdAt': 'Oldest',
            'price': 'Cheapest',
            '-price': 'Most expensive',
            'title': 'Title ASC',
            '-title': 'Title DESC',
        };
    }
}
