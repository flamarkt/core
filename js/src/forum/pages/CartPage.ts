import {Vnode} from 'mithril';
import app from 'flarum/forum/app';
import {ApiPayloadSingle} from 'flarum/common/Store';
import Page from 'flarum/common/components/Page';
import extractText from 'flarum/common/utils/extractText';
import Cart from '../../common/models/Cart';
import CartLayout from '../layouts/CartLayout';

export default class CartPage extends Page {
    loading: boolean = true;
    cart: Cart | null = null;

    oninit(vnode: Vnode) {
        super.oninit(vnode);

        app.request<ApiPayloadSingle>({
            method: 'GET',
            url: app.forum.attribute('apiUrl') + '/flamarkt/cart',
        }).then(cart => {
            this.loading = false;
            this.cart = app.store.pushPayload<Cart>(cart);

            m.redraw();
        }).catch(error => {
            this.loading = false;

            m.redraw();

            throw error;
        });

        app.setTitle(extractText(app.translator.trans('flamarkt-core.forum.cart.browserTitle')));
        app.setTitleCount(0);
    }

    view() {
        let cart;

        if (this.loading) {
            cart = null;
        } else if (!this.cart) {
            cart = app.store.createRecord('flamarkt-carts');
        } else {
            cart = this.cart;
        }

        return CartLayout.component({
            cart,
        });
    }
}
