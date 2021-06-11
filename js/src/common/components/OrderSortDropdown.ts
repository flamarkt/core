import AbstractSortDropdown, {SortDropdownAttrs, SortOptions} from './AbstractSortDropdown';
import OrderListState from '../states/OrderListState';

export interface OrderSortDropdownAttrs extends SortDropdownAttrs {
    state: OrderListState
}

export default class OrderSortDropdown extends AbstractSortDropdown<OrderSortDropdownAttrs> {
    className(): string {
        return 'OrderSortDropdown';
    }

    options(): SortOptions {
        return {
            '-createdAt': 'Newest',
            'createdAt': 'Oldest',
            '-priceTotal': 'Highest total',
            'priceTotal': 'Lowest total',
        };
    }
}
