import OrderLine from '../../common/models/OrderLine';
import Product from '../../common/models/Product';
export default class OrderLineEditState {
    uniqueFormKey: string;
    line?: OrderLine;
    group: string | null;
    type: string | null;
    label: string;
    comment: string;
    quantity: number;
    priceUnit: number;
    priceTotal: number;
    product: Product | null;
    constructor();
    init(line: OrderLine): void;
    updateTotal(): void;
    data(): any;
}
