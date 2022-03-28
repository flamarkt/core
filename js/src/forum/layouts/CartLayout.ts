import app from 'flarum/forum/app';
import AbstractShopLayout, {AbstractShopLayoutAttrs} from './AbstractShopLayout';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import Button from 'flarum/common/components/Button';
import Cart from '../../common/models/Cart';
import Order from '../../common/models/Order';
import ItemList from 'flarum/common/utils/ItemList';
import CartPageSection from '../components/CartPageSection';
import CartTable from '../components/CartTable';

export interface CartLayoutAttrs extends AbstractShopLayoutAttrs {
    cart?: Cart
}

export default class CartLayout extends AbstractShopLayout<CartLayoutAttrs> {
    submitting: boolean = false;

    className() {
        return 'CartPage';
    }

    title() {
        return app.translator.trans('flamarkt-core.forum.cart.headingTitle');
    }

    content() {
        const {cart} = this.attrs;

        if (!cart) {
            return LoadingIndicator.component();
        }

        if (!cart.exists) {
            return 'No cart';
        }

        return m('form', {
            onsubmit: this.onsubmit.bind(this),
        }, this.sections().toArray());
    }

    sectionProducts(): ItemList<any> {
        const items = new ItemList();

        items.add('table', CartTable.component({
            cart: this.attrs.cart,
        }));

        return items;
    }

    sectionPayment(): ItemList<any> {
        return new ItemList();
    }

    sections(): ItemList<any> {
        const sections = new ItemList();

        sections.add('products', CartPageSection.component({
            className: 'CartPage-products',
            title: 'Products',
        }, this.sectionProducts().toArray()));

        const sectionPayment = this.sectionPayment().toArray();

        if (sectionPayment.length) {
            sections.add('payment', CartPageSection.component({
                className: 'CartPage-payment',
                title: 'Payment',
            }, sectionPayment));
        }

        sections.add('submit', m('.Form-group', Button.component({
            type: 'submit',
            className: 'Button Button--primary',
            loading: this.submitting,
        }, 'Place order')));

        return sections;
    }

    data() {
        //TODO: idempotency key
        return {
            relationships: {
                cart: this.attrs.cart,
            },
        };
    }

    onsubmit(event: Event) {
        event.preventDefault();

        this.submitting = true;

        app.store.createRecord('flamarkt-orders')
            .save(this.data())
            .then(this.afterSuccessfulSubmit.bind(this))
            .catch(this.afterFailedSubmit.bind(this));
    }

    afterSuccessfulSubmit(order: Order) {
        // Not setting submitting to false on purpose
        // We don't want the users to think the page stopped processing until it's redirected

        m.route.set(app.route.order(order));

        // Refresh cart, otherwise the cart icon in the header will continue to show the old total
        app.cart.load();
    }

    afterFailedSubmit(error: any) {
        this.submitting = false;

        m.redraw();

        throw error;
    }
}
