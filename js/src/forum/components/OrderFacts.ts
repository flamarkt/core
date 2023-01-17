import {Children, Vnode} from 'mithril';
import Component, {ComponentAttrs} from 'flarum/common/Component';
import ItemList from 'flarum/common/utils/ItemList';
import Order from '../../common/models/Order';
import Payment from '../../common/models/Payment';
import OrderFactPayment from './OrderFactPayment';
import OrderFact from './OrderFact';

export interface OrderFactsAttrs extends ComponentAttrs {
    order: Order
}

export default class OrderFacts extends Component<OrderFactsAttrs> {
    view() {
        const items = this.items().toArray();

        return items.length > 0 ? m('.FlamarktOrderFacts', items) : null;
    }

    items(): ItemList<Children> {
        const items = new ItemList<Children>();

        const shippingInformation = this.shippingInformation().toArray();

        if (shippingInformation.length) {
            items.add('shipping', m(OrderFact, {
                title: 'Shipping',
                className: 'FlamarktOrderFact--shipping',
            }, this.wrapContent(...shippingInformation)), 100);
        }

        const paymentInformation = this.paymentInformation().toArray();

        if (paymentInformation.length) {
            items.add('payment', m(OrderFact, {
                title: 'Payment status',
                className: 'FlamarktOrderFact--payment',
            }, this.wrapContent(...paymentInformation)), 50);
        }

        return items;
    }

    shippingInformation(): ItemList<Children> {
        return new ItemList<Children>();
    }

    paymentInformation(): ItemList<Children> {
        const items = new ItemList<Children>();

        (this.attrs.order.payments() || []).forEach(payment => {
            if (!payment || !this.paymentVisible(payment)) {
                return;
            }

            items.add('payment-' + payment.id(), m(OrderFactPayment, {
                payment,
            }), 10); // All payment entries will have identical priority, we rely on the original order being preserved
        });

        return items;
    }

    paymentVisible(payment: Payment): boolean {
        return true;
    }

    dontWrapContent(vnode: Vnode): boolean {
        return vnode.tag === 'dd' || vnode.tag === OrderFactPayment;
    }

    wrapContent(...content: Children[]): Children {
        return content.map(c => {
            // If the child is already a <dd> tag, keep it as-it
            // This allows children to have classNames and event listeners on their block with ease
            if (c && typeof c === 'object' && !Array.isArray(c) && this.dontWrapContent(c)) {
                return c;
            }

            return m('dd', c);
        });
    }
}
