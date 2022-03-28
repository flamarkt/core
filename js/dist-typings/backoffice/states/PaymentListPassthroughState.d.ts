import AbstractListState from 'flamarkt/backoffice/common/states/AbstractListState';
import Payment from '../../common/models/Payment';
import Order from '../../common/models/Order';
/**
 * Allows using a List component with the relationship from the order object
 */
export default class PaymentListPassthroughState extends AbstractListState<Payment> {
    type(): string;
    constructor(order: Order);
}
