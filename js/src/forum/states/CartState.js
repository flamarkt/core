export default class CartState {
    constructor() {
        //this.cart = cart; //TODO?
        this.loading = false;
    }

    priceTotal() {
        //TODO
        this.cart = app.forum.cart();

        return this.cart ? this.cart.priceTotal() : null;
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
