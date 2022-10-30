import AbstractSortDropdown, { SortDropdownAttrs, SortOptions } from 'flamarkt/backoffice/common/components/AbstractSortDropdown';
import ProductListState from '../states/ProductListState';
export interface ProductSortDropdownAttrs extends SortDropdownAttrs {
    list: ProductListState;
}
export default class ProductSortDropdown extends AbstractSortDropdown<ProductSortDropdownAttrs> {
    className(): string;
    options(): SortOptions;
}
