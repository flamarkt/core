import AbstractSortDropdown, {SortDropdownAttrs, SortOptions} from 'flamarkt/backoffice/common/components/AbstractSortDropdown';
import OrderListState from '../states/OrderListState';

export interface OrderSortDropdownAttrs extends SortDropdownAttrs {
    list: OrderListState
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
