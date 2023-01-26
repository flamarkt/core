import {Children, Vnode} from 'mithril';
import app from 'flarum/forum/app';
import AbstractShopLayout, {AbstractShopLayoutAttrs} from './AbstractShopLayout';
import Button from 'flarum/common/components/Button';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import ItemList from 'flarum/common/utils/ItemList';
import RequestError from 'flarum/common/utils/RequestError';
import Cart from '../../common/models/Cart';
import Order from '../../common/models/Order';
import Product from '../../common/models/Product';
import CartPageSection from '../components/CartPageSection';
import CartTable from '../components/CartTable';

export interface CartLayoutAttrs extends AbstractShopLayoutAttrs {
    cart?: Cart
}

export default class CartLayout extends AbstractShopLayout<CartLayoutAttrs> {
    /**
     * This property is not used natively but is available for extensions.
     * If a ?continue= query parameter is passed in the URL its value will be copied here.
     * While the value is non-null, the page will be in disabled state and payment methods will show as loading.
     * This is intended to be used for payment methods that require a redirect so that the final submission can be performed
     * by the single page app with all its built-in error handling.
     * If an API error occurs, the value will be reset to null and the page should be interactive again.
     */
    continue: string | null = null

    /**
     * Indicates whether the built-in default form submission is in progress.
     * Extensions should create their own properties so that they can transition their specific submit button into loading state.
     * The additional values can then be returned as OR values in formDisabled().
     */
    builtInSubmitting: boolean = false;

    /**
     * Whether the layout should show the entire page being loaded.
     * This method MUST return true if the cart attr is unavailable.
     * It may return true in other situations as required by extensions.
     */
    pageLoading(): boolean {
        return !this.attrs.cart;
    }

    /**
     * Whether all fields and actions should be disabled, to be used while a payment is being processed or the order submitted.
     * Additional values should be OR-ed with the existing value.
     */
    formDisabled(): boolean {
        return !!this.continue || this.builtInSubmitting;
    }

    className() {
        return 'CartPage';
    }

    title() {
        return app.translator.trans('flamarkt-core.forum.cart.headingTitle');
    }

    oninit(vnode: Vnode) {
        super.oninit(vnode);

        this.continue = m.route.param('continue') || null;

        if (this.attrs.cart) {
            this.onCartAvailable();
        }
    }

    onbeforeupdate(vnode: Vnode) {
        super.onbeforeupdate(vnode);

        if (!this.onCartAvailableHasRun && this.attrs.cart) {
            this.onCartAvailable();
        }
    }

    onCartAvailableHasRun: boolean = false

    /**
     * Called before the first redraw where the cart is available happens.
     * This is a convenient solution for extensions so they don't need to extend both on oninit and onbeforeupdate
     */
    onCartAvailable(): void {
        this.onCartAvailableHasRun = true;
    }

    content() {
        const {cart} = this.attrs;

        // Cart being loaded is one of the conditions checked by pageLoading() but for extra safety we'll double-check it
        // This way if an extension messes up the pageLoading callback the page won't completely fail to load.
        if (this.pageLoading() || !cart) {
            return LoadingIndicator.component();
        }

        if (!cart.exists) {
            return m('p', app.translator.trans('flamarkt-core.forum.cart.noCartInfo'));
        }

        if (!cart.canAddProducts()) {
            return m('p', app.translator.trans('flamarkt-core.forum.cart.cannotAddProducts'));
        }

        return m('form', {
            onsubmit: this.onsubmit.bind(this),
        }, this.sections().toArray());
    }

    sectionProducts(): ItemList<Children> {
        const items = new ItemList<Children>();

        items.add('table', CartTable.component({
            cart: this.attrs.cart,
        }));

        return items;
    }

    partialPaymentOptions(): ItemList<Children> {
        return new ItemList<Children>();
    }

    /**
     * Extensions should modify the return value to true if a partial payment method has been enabled but doesn't cover the full amount.
     * It will switch the label/help text value below to indicate that another method from "instant" or "other" should be picked.
     */
    partialPaymentCoversIncompleteAmount(): boolean {
        return false;
    }

    partialPaymentOrLabel(): Children {
        return app.translator.trans('flamarkt-core.forum.cart.payment.' + (this.partialPaymentCoversIncompleteAmount() ? 'completeWith' : 'partialOr'));
    }

    instantPaymentOptions(): ItemList<Children> {
        return new ItemList<Children>();
    }

    instantPaymentOrLabel(): Children {
        return app.translator.trans('flamarkt-core.forum.cart.payment.instantOr');
    }

    otherPaymentOptions(): ItemList<Children> {
        return new ItemList<Children>();
    }

    /**
     * Extend to delay the rendering of payment options.
     * Useful to prevent jumps when new methods dynamically appear in the list.
     */
    paymentsLoading(): boolean {
        return !!this.continue;
    }

    sectionPayment(): ItemList<Children> {
        const items = new ItemList<Children>();

        if (this.paymentsLoading()) {
            items.add('loading', LoadingIndicator.component(), 100);

            return items;
        }

        const partial = this.partialPaymentOptions().toArray();
        const instant = this.instantPaymentOptions().toArray();
        const other = this.otherPaymentOptions().toArray();

        items.add('partial', m('.CartPayment--partial', partial), 30);

        if (partial.length > 0 && (instant.length > 0 || other.length > 0)) {
            items.add('partial-separator', m('.CartPaymentSeparator--partial', {
                className: this.partialPaymentCoversIncompleteAmount() ? 'CartPaymentSeparator--complete-with' : '',
            }, this.partialPaymentOrLabel()), 25);
        }

        items.add('instant', m('.CartPayment--instant', instant), 20);

        if (instant.length > 0 && other.length > 0) {
            items.add('instant-separator', m('.CartPaymentSeparator--instant', this.instantPaymentOrLabel()), 15);
        }

        items.add('other', m('.CartPayment--other', other), 10);

        // We add this button here mostly for testing
        // If there's any amount to pay, the payment method should add its own button
        if (this.attrs.cart!.priceTotal() === 0) {
            items.add('submit', m('.Form-group', Button.component({
                className: 'Button Button--primary',
                loading: this.builtInSubmitting,
                disabled: this.submitDisabled(),
                onclick: () => {
                    this.builtInSubmitting = true;

                    this.submitOrder();
                },
            }, app.translator.trans('flamarkt-core.forum.cart.checkout'))));
        }

        return items;
    }

    sections(): ItemList<Children> {
        const sections = new ItemList<Children>();

        sections.add('products', CartPageSection.component({
            className: 'CartPage-products',
            title: app.translator.trans('flamarkt-core.forum.cart.section.products'),
        }, this.sectionProducts().toArray()));

        const sectionPayment = this.sectionPayment().toArray();

        if (sectionPayment.length) {
            sections.add('payment', CartPageSection.component({
                className: 'CartPage-payment',
                title: app.translator.trans('flamarkt-core.forum.cart.section.payment'),
            }, sectionPayment));
        }

        return sections;
    }

    /**
     * Extend this attribute to globally disable cart submit
     */
    submitDisabled(): boolean {
        // Value will be null for fresh carts or carts where an error occurred during meta updating
        // TODO: should still be able to submit if meta is out of date, but that's unlikely to be an unhandled issue
        const productCount = this.attrs.cart!.productCount() || 0;

        return this.formDisabled() || !this.attrs.cart!.canCheckout() || productCount === 0;
    }

    /**
     * Build the data to send to the REST API during the submitOrder() process.
     * Keep in mind extensions like Stripe will perform redirects, so the data you return here should be persisted across page reloads.
     * If data cannot be persisted in the browser, you should instead store it on the cart model in the backend and not use this method.
     * @param additionalData Data that is passed by extensions when calling submitOrder(), for example to specify the payment method used
     */
    data(additionalData: any = {}): any {
        const {relationships: additionalRelationships, ...otherAdditionalData} = additionalData;

        //TODO: idempotency key
        return {
            relationships: {
                cart: this.attrs.cart,
                ...additionalRelationships,
            },
            ...otherAdditionalData,
        };
    }

    /**
     * Handles the form onsubmit event.
     * By default, nothing happens as we want the user to explicitly submit the form through the submit button of their payment method.
     * @param event
     */
    onsubmit(event: Event): void {
        event.preventDefault();
    }

    submitOrder(additionalData: any = {}): void {
        app.store.createRecord<Order>('flamarkt-orders')
            .save(this.data(additionalData), {
                errorHandler: this.cartSubmissionErrorHandler,
            })
            .then(this.afterSuccessfulSubmit.bind(this))
            .catch(this.afterFailedSubmit.bind(this));
    }

    cartSubmissionErrorHandler(error: RequestError) {
        // Current version is copy-pasted from Application.tsx to replicate Flarum default
        // This allows extensions to handle their own validation errors the way they want
        const formattedErrors = error.response?.errors?.map((e) => decodeURI(e.detail ?? '')) ?? [];

        let content;
        switch (error.status) {
            case 422:
                content = formattedErrors
                    .map((detail) => [detail, m('br')])
                    .flat()
                    .slice(0, -1);
                break;

            case 401:
            case 403:
                content = app.translator.trans('core.lib.error.permission_denied_message');
                break;

            case 404:
            case 410:
                content = app.translator.trans('core.lib.error.not_found_message');
                break;

            case 413:
                content = app.translator.trans('core.lib.error.payload_too_large_message');
                break;

            case 429:
                content = app.translator.trans('core.lib.error.rate_limit_exceeded_message');
                break;

            default:
                content = app.translator.trans('core.lib.error.generic_message');
        }

        const isDebug: boolean = app.forum.attribute('debug');

        error.alert = {
            type: 'error',
            content,
            controls: [
                isDebug && Button.component({
                    className: 'Button Button--link',
                    onclick: app.showDebug.bind(app, error, formattedErrors),
                }, app.translator.trans('core.lib.debug_button')),
            ],
        };

        app.requestErrorDefaultHandler(error, isDebug, formattedErrors);
    }

    afterSuccessfulSubmit(order: Order): void {
        // Not setting submitting to false on purpose
        // We don't want the users to think the page stopped processing until it's redirected

        // Reset the cached quantities for each product still in the store
        // Otherwise if we immediately go back to their product page they will still show being already in cart
        app.store.all<Product>('flamarkt-products').forEach(product => {
            product.pushAttributes({
                cartQuantity: null,
            });
        });

        m.route.set(app.route.order(order));

        // Refresh cart, otherwise the cart icon in the header will continue to show the old total
        app.cart.load();
    }

    afterFailedSubmit(error: any): void {
        this.builtInSubmitting = false;

        if (this.continue) {
            this.resetContinue();
        }

        m.redraw();

        throw error;
    }

    /**
     * To be called once the continue value has been handled and the page has not been redirected elsewhere.
     * The method does not trigger a redraw. The code that calls the method should take care of it.
     */
    resetContinue(): void {
        this.continue = null;

        // Remove query string from URL but without triggering a page refresh
        window.history.replaceState(
            null,
            '',
            new URL(app.route('flamarkt.cart'), app.forum.attribute('baseUrl'))
        );

        this.onContinueReset();
    }

    /**
     * Can be extended by extensions to run custom logic when the CONTINUE value is cleared.
     * This method will/should only be called when the CONTINUE flag exists.
     * It should not trigger a sync redraw because it will be called from code that already performs a redraw.
     */
    onContinueReset(): void {
    }
}
