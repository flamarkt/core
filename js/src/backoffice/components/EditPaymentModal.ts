import {Vnode} from 'mithril';
import Modal from 'flarum/common/components/Modal';
import ItemList from 'flarum/common/utils/ItemList';
import SubmitButton from './SubmitButton';
import PermanentDeleteButton from './PermanentDeleteButton';
import Payment from '../../common/models/Payment';
import PriceInput from '../../common/components/PriceInput';

interface EditPaymentModalAttrs {
    payment?: Payment
}

export default class EditPaymentModal extends Modal {
    payment!: Payment
    method: string = ''
    identifier: string = ''
    amount: number = 0
    dirty: boolean = false

    oninit(vnode: Vnode<EditPaymentModalAttrs, this>) {
        super.oninit(vnode);

        if (vnode.attrs.payment) {
            this.payment = vnode.attrs.payment;
            this.method = this.payment.method() || '';
            this.identifier = this.payment.identifier() || '';
            this.amount = this.payment.amount() || 0;
        } else {
            // TODO: order relationship
            this.payment = app.store.createRecord('flamarkt-payments');
        }
    }

    content() {
        return m('.Modal-body', this.fields().toArray());
    }

    fields(): ItemList {
        const fields = new ItemList();

        fields.add('method', m('.Form-group', [
            m('label', app.translator.trans('flamarkt-core.backoffice.payments.field.method')),
            m('input.FormControl', {
                type: 'text',
                value: this.method,
                oninput: (event: Event) => {
                    this.method = (event.target as HTMLInputElement).value;
                    this.dirty = true;
                },
                disabled: this.loading,
            }),
        ]), 30);

        fields.add('identifier', m('.Form-group', [
            m('label', app.translator.trans('flamarkt-core.backoffice.payments.field.identifier')),
            m('input.FormControl', {
                type: 'text',
                value: this.identifier,
                oninput: (event: Event) => {
                    this.identifier = (event.target as HTMLInputElement).value;
                    this.dirty = true;
                },
                disabled: this.loading,
            }),
        ]), 20);

        fields.add('amount', m('.Form-group', [
            m('label', app.translator.trans('flamarkt-core.backoffice.payments.field.amount')),
            m(PriceInput, {
                value: this.amount,
                onchange: (value: number) => {
                    this.amount = value;
                    this.dirty = true;
                },
                disabled: this.loading,
            }),
        ]), 10);

        fields.add('submit', m('.Form-group', [
            SubmitButton.component({
                loading: this.loading,
                dirty: this.dirty,
                exists: this.payment.exists,
            }),
            ' ',
            PermanentDeleteButton.component({
                model: this.payment,
                afterdelete() {
                    // TODO: refresh order state
                    app.modal.close();
                },
            }),
        ]), -10);

        return fields;
    }

    data() {
        return {
            method: this.method || null,
            identifier: this.identifier || null,
            amount: this.amount,
        };
    }

    onsubmit(event: Event) {
        event.preventDefault();

        this.loading = true;

        this.payment.save(this.data()).then(payment => {
            this.payment = payment;
            this.dirty = false;
            this.loading = false;
            m.redraw();
        }, this.loaded.bind(this));
    }
}
