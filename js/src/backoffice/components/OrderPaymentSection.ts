import app from 'flamarkt/backoffice/backoffice/app';
import Component from 'flarum/common/Component';
import ItemList from 'flarum/common/utils/ItemList';
import PaymentList from './PaymentList';
import PaymentListPassthroughState from '../states/PaymentListPassthroughState';
import Order from '../../common/models/Order';
import PriceLabel from '../../common/components/PriceLabel';

export interface OrderPaymentSectionAttrs {
    order: Order
}

export default class OrderPaymentSection extends Component<OrderPaymentSectionAttrs> {
    view() {
        return m('.OrderPaymentSection', this.fields().toArray());
    }

    fields(): ItemList<any> {
        const fields = new ItemList();

        const {order} = this.attrs;

        fields.add('title', m('h3', app.translator.trans('flamarkt-core.backoffice.payments.title')), 100);

        fields.add('totals', m('.Form-group.OrderPaymentSectionTotals', [
            'Due: ',
            m(PriceLabel, {
                value: order.priceTotal(),
            }),
            ' / Paid: ',
            m(PriceLabel, {
                value: order.paidAmount(),
            }),
        ]), 100);

        fields.add('payments', m('.Form-group', [
            m(PaymentList, {
                state: new PaymentListPassthroughState(order),
            }),
        ]), 0);

        return fields;
    }
}
