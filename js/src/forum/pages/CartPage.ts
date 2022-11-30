import {Vnode} from 'mithril';
import app from 'flarum/forum/app';
import Page from 'flarum/common/components/Page';
import extractText from 'flarum/common/utils/extractText';
import CartLayout from '../layouts/CartLayout';

export default class CartPage extends Page {
    oninit(vnode: Vnode) {
        super.oninit(vnode);

        app.cart.load();

        app.setTitle(extractText(app.translator.trans('flamarkt-core.forum.cart.browserTitle')));
        app.setTitleCount(0);
    }

    view() {
        let cart;

        if (app.cart.loading) {
            cart = null;
        } else if (!app.cart.cart) {
            cart = app.store.createRecord('flamarkt-carts');
        } else {
            cart = app.cart.cart;
        }

        return CartLayout.component({
            cart,
        });
    }
}
