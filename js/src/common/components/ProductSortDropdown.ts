import app from 'flarum/common/app';
import AbstractSortDropdown, {SortDropdownAttrs, SortOptions} from 'flamarkt/backoffice/common/components/AbstractSortDropdown';
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
            '-createdAt': app.translator.trans('flamarkt-core.lib.sort.products.createdAtDesc') as string,
            'createdAt': app.translator.trans('flamarkt-core.lib.sort.products.createdAtAsc') as string,
            'price': app.translator.trans('flamarkt-core.lib.sort.products.priceAsc') as string,
            '-price': app.translator.trans('flamarkt-core.lib.sort.products.priceDesc') as string,
            'title': app.translator.trans('flamarkt-core.lib.sort.products.titleAsc') as string,
            '-title': app.translator.trans('flamarkt-core.lib.sort.products.titleDesc') as string,
        };
    }
}
