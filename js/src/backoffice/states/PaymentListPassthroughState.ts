import AbstractListState, {Page} from 'flamarkt/backoffice/common/states/AbstractListState';
import Payment from '../../common/models/Payment';
import Order from '../../common/models/Order';

/**
 * Allows using a List component with the relationship from the order object
 */
export default class PaymentListPassthroughState extends AbstractListState<Payment> {
    type() {
        return 'flamarkt-payments';
    }

    constructor(order: Order) {
        super();

        const payments = order.payments() as Payment[] | false;

        this.loading = false;
        this.pages = [
            new Page<Payment>(1, payments || []),
        ];
    }
}
