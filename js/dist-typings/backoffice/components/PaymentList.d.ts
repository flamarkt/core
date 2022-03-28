import Payment from '../../common/models/Payment';
import AbstractList from 'flamarkt/backoffice/backoffice/components/AbstractList';
export default class PaymentList extends AbstractList<Payment> {
    head(): import("flarum/common/utils/ItemList").default<any>;
    columns(payment: Payment): import("flarum/common/utils/ItemList").default<any>;
    actions(payment: Payment): import("flarum/common/utils/ItemList").default<any>;
}
