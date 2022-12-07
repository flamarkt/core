import app from 'flarum/forum/app';
import {ApiPayloadSingle} from 'flarum/common/Store';
import Cart from '../../common/models/Cart';

export default class CartState {
    cart: Cart | null = null
    loading: boolean = false

    priceTotal() {
        return this.cart ? this.cart.priceTotal() : null;
    }

    productCount() {
        return this.cart ? this.cart.productCount() : null;
    }

    /**
     * To be called by Flamarkt itself with the boot payload
     */
    boot() {
        this.cart = app.forum.cart() || null;
    }

    /**
     * Separate method so that extensions can retrieve a cart update without triggering the loading status or redraw
     * But with all the same relationships.
     */
    request(): Promise<Cart> {
        // Load full cart including relationships
        return app.request<ApiPayloadSingle>({
            method: 'GET',
            url: app.forum.attribute('apiUrl') + '/flamarkt/cart',
        }).then(cart => {
            return app.store.pushPayload<Cart>(cart);
        });
    }

    /**
     * Intended to be used with a manually retrieved value with request()
     * @param cart
     */
    setCart(cart: Cart | null) {
        this.loading = false;
        this.cart = cart;
    }

    /**
     * Refresh the global cart
     */
    load(): Promise<void> {
        this.loading = true;

        return this.request().then(cart => {
            this.setCart(cart);

            m.redraw();
        }).catch(error => {
            this.loading = false;

            m.redraw();

            throw error;
        });
    }
}
