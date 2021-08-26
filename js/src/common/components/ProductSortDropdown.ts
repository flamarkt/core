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
            '-createdAt': app.translator.trans('flamarkt-core.lib.sort.products.createdAtDesc'),
            'createdAt': app.translator.trans('flamarkt-core.lib.sort.products.createdAtAsc'),
            'price': app.translator.trans('flamarkt-core.lib.sort.products.priceAsc'),
            '-price': app.translator.trans('flamarkt-core.lib.sort.products.priceDesc'),
            'title': app.translator.trans('flamarkt-core.lib.sort.products.titleAsc'),
            '-title': app.translator.trans('flamarkt-core.lib.sort.products.titleDesc'),
        };
    }
}
