import Button from 'flarum/common/components/Button';
import humanTime from 'flarum/common/helpers/humanTime';
import PriceLabel from '../../common/components/PriceLabel';
import Payment from '../../common/models/Payment';
import AbstractList from './AbstractList';
import EditPaymentModal from './EditPaymentModal';

export default class PaymentList extends AbstractList<Payment> {
    head() {
        const columns = super.head();

        columns.add('date', m('th', app.translator.trans('flamarkt-core.backoffice.payments.head.date')), 40);
        columns.add('method', m('th', app.translator.trans('flamarkt-core.backoffice.payments.head.method')), 30);
        columns.add('identifier', m('th', app.translator.trans('flamarkt-core.backoffice.payments.head.identifier')), 20);
        columns.add('amount', m('th', app.translator.trans('flamarkt-core.backoffice.payments.head.amount')), 10);

        return columns;
    }

    columns(payment: Payment) {
        const columns = super.columns(payment);

        columns.add('date', m('td', humanTime(payment.createdAt())), 40);
        columns.add('method', m('td', payment.method()), 30);
        columns.add('identifier', m('td', payment.identifier()), 20);
        columns.add('amount', m('td', m(PriceLabel, {
            value: payment.amount(),
        })), 10);

        return columns;
    }

    actions(payment: Payment) {
        const actions = super.actions(payment);

        actions.add('edit', Button.component({
            className: 'Button Button--icon',
            icon: 'fas fa-pen',
            onclick() {
                app.modal.show(EditPaymentModal, {
                    payment,
                });
            },
        }));

        return actions;
    }
}
