/// <reference types="flarum/@types/translator-icu-rich" />
import { Children, Vnode } from 'mithril';
import AbstractShopLayout, { AbstractShopLayoutAttrs } from './AbstractShopLayout';
import ItemList from 'flarum/common/utils/ItemList';
import RequestError from 'flarum/common/utils/RequestError';
import Cart from '../../common/models/Cart';
import Order from '../../common/models/Order';
export interface CartLayoutAttrs extends AbstractShopLayoutAttrs {
    cart?: Cart;
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
    continue: string | null;
    /**
     * Indicates whether the built-in default form submission is in progress.
     * Extensions should create their own properties so that they can transition their specific submit button into loading state.
     * The additional values can then be returned as OR values in formDisabled().
     */
    builtInSubmitting: boolean;
    /**
     * Whether the layout should show the entire page being loaded.
     * This method MUST return true if the cart attr is unavailable.
     * It may return true in other situations as required by extensions.
     */
    pageLoading(): boolean;
    /**
     * Whether all fields and actions should be disabled, to be used while a payment is being processed or the order submitted.
     * Additional values should be OR-ed with the existing value.
     */
    formDisabled(): boolean;
    className(): string;
    title(): import("@askvortsov/rich-icu-message-formatter").NestedStringArray;
    oninit(vnode: Vnode): void;
    onbeforeupdate(vnode: Vnode): void;
    onCartAvailableHasRun: boolean;
    /**
     * Called before the first redraw where the cart is available happens.
     * This is a convenient solution for extensions so they don't need to extend both on oninit and onbeforeupdate
     */
    onCartAvailable(): void;
    content(): any;
    sectionProducts(): ItemList<Children>;
    partialPaymentOptions(): ItemList<Children>;
    /**
     * Extensions should modify the return value to true if a partial payment method has been enabled but doesn't cover the full amount.
     * It will switch the label/help text value below to indicate that another method from "instant" or "other" should be picked.
     */
    partialPaymentCoversIncompleteAmount(): boolean;
    partialPaymentOrLabel(): Children;
    instantPaymentOptions(): ItemList<Children>;
    instantPaymentOrLabel(): Children;
    otherPaymentOptions(): ItemList<Children>;
    /**
     * Extend to delay the rendering of payment options.
     * Useful to prevent jumps when new methods dynamically appear in the list.
     */
    paymentsLoading(): boolean;
    sectionPayment(): ItemList<Children>;
    sections(): ItemList<Children>;
    /**
     * Extend this attribute to globally disable cart submit
     */
    submitDisabled(): boolean;
    /**
     * Build the data to send to the REST API during the submitOrder() process.
     * Keep in mind extensions like Stripe will perform redirects, so the data you return here should be persisted across page reloads.
     * If data cannot be persisted in the browser, you should instead store it on the cart model in the backend and not use this method.
     * @param additionalData Data that is passed by extensions when calling submitOrder(), for example to specify the payment method used
     */
    data(additionalData?: any): any;
    /**
     * Handles the form onsubmit event.
     * By default, nothing happens as we want the user to explicitly submit the form through the submit button of their payment method.
     * @param event
     */
    onsubmit(event: Event): void;
    submitOrder(additionalData?: any): void;
    cartSubmissionErrorHandler(error: RequestError): void;
    afterSuccessfulSubmit(order: Order): void;
    afterFailedSubmit(error: any): void;
    /**
     * To be called once the continue value has been handled and the page has not been redirected elsewhere.
     * The method does not trigger a redraw. The code that calls the method should take care of it.
     */
    resetContinue(): void;
    /**
     * Can be extended by extensions to run custom logic when the CONTINUE value is cleared.
     * This method will/should only be called when the CONTINUE flag exists.
     * It should not trigger a sync redraw because it will be called from code that already performs a redraw.
     */
    onContinueReset(): void;
}
