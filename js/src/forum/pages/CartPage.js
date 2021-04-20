import Page from 'flarum/common/components/Page';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import Button from 'flarum/common/components/Button';

export default class CartPage extends Page {
    oninit(vnode) {
        super.oninit(vnode);

        this.loading = true;
        this.cart = null;

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

    view() {
        if (this.loading) {
            return LoadingIndicator.component();
        }

        const products = this.cart.products() || [];

        return m('container', [
            m('h1', 'Cart'),
            m('table', [
                m('thead', m('tr', [
                    m('th', 'Product'),
                    m('th', 'Quantity'),
                    m('th', 'Total'),
                ])),
                m('tbody', products.map(product => m('tr', [
                    m('td', product.title()),
                    m('td', [
                        m('input.FormControl', {
                            type: 'number',
                            value: product.cartQuantity(),
                        }),
                    ]),
                ]))),
            ]),
            m('.Form-group', Button.component({
                className: 'Button Button--primary',
                onclick: () => {
                    app.store.createRecord('flamarkt-orders').save({
                        relationships: {
                            cart: this.cart,
                        },
                    }).then(order => {
                        // TODO
                    }).catch(error => {
                        // TODO
                    });
                },
            }, 'Place order')),
        ]);
    }
}
