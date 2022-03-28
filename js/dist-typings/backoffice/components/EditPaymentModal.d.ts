import { Vnode } from 'mithril';
import Modal from 'flarum/common/components/Modal';
import ItemList from 'flarum/common/utils/ItemList';
import Payment from '../../common/models/Payment';
interface EditPaymentModalAttrs {
    payment?: Payment;
}
export default class EditPaymentModal extends Modal {
    payment: Payment;
    method: string;
    identifier: string;
    amount: number;
    dirty: boolean;
    oninit(vnode: Vnode<EditPaymentModalAttrs, this>): void;
    content(): any;
    fields(): ItemList<any>;
    data(): {
        method: string | null;
        identifier: string | null;
        amount: number;
    };
    onsubmit(event: Event): void;
}
export {};
