import {Children} from 'mithril';
import Component, {ComponentAttrs} from 'flarum/common/Component';
import ItemList from 'flarum/common/utils/ItemList';
import Payment from '../../common/models/Payment';
import PriceLabel from '../../common/components/PriceLabel';
import DateFormat from '../utils/DateFormat';

export interface OrderFactPaymentAttrs extends ComponentAttrs {
    payment: Payment
}

export default class OrderFactPayment extends Component<OrderFactPaymentAttrs> {
    view() {
        return m('dd.FlamarktOrderFactPayment', this.items().toArray());
    }

    items(): ItemList<Children> {
        const items = new ItemList<Children>();

        const date = this.date();

        if (date) {
            // A space is inserted at the end of each item to improve the no-CSS readability
            // Since this content will also be visible in emails where CSS could fail to load
            items.add('date', m('span.date', [date, ' ']), 30);
        }

        const amount = this.amount();

        if (amount) {
            items.add('amount', m('span.amount', [amount, ' ']), 20);
        }

        const label = this.label();

        if (label) {
            items.add('label', m('span.label', [label, ' ']), 10);
        }

        return items;
    }

    date(): Children {
        const d = dayjs(this.attrs.payment.createdAt());

        // Similar title formatting to humanTime() but we change the visible date format
        return m('time', {
            datetime: d.format(),
            title: d.format('LLLL'),
        }, d.format(DateFormat.paymentDayFormat()));
    }

    label(): Children {
        // This is primarily meant as a fallback in case the corresponding extension was disabled
        return m('code', this.attrs.payment.method());
    }

    amount(): Children {
        return m(PriceLabel, {
            value: this.attrs.payment.amount(),
        });
    }
}
