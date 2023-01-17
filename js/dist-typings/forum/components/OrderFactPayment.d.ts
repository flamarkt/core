import { Children } from 'mithril';
import Component, { ComponentAttrs } from 'flarum/common/Component';
import ItemList from 'flarum/common/utils/ItemList';
import Payment from '../../common/models/Payment';
export interface OrderFactPaymentAttrs extends ComponentAttrs {
    payment: Payment;
}
export default class OrderFactPayment extends Component<OrderFactPaymentAttrs> {
    view(): any;
    items(): ItemList<Children>;
    date(): Children;
    label(): Children;
    amount(): Children;
}
