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

    boot() {
        this.cart = app.forum.cart();
    }

    load() {
        this.loading = true;

        // Load full cart including relationships
        app.request({
            method: 'GET',
            url: app.forum.attribute('apiUrl') + '/flamarkt/cart',
        }).then(cart => {
            this.loading = false;
            this.cart = app.store.pushPayload(cart);

            m.redraw();
        }).catch(error => {
            this.loading = false;

            m.redraw();

            throw error;
        });
    }
}
