import {Vnode} from 'mithril';
import app from 'flarum/forum/app';
import Component, {ComponentAttrs} from 'flarum/common/Component';
import Button from 'flarum/common/components/Button';
import Product from '../../common/models/Product';
import QuantityInput from '../../common/components/QuantityInput';

interface ProductQuantityAttrs extends ComponentAttrs {
    product: Product
}

export default class ProductQuantity extends Component<ProductQuantityAttrs> {
    cartQuantity: number = 1;
    savingQuantity: boolean = false;

    oninit(vnode: Vnode<ProductQuantityAttrs, this>) {
        super.oninit(vnode);

        this.cartQuantity = this.attrs.product.cartQuantity() || 1;
    }

    view() {
        const {product} = this.attrs;

        return m('.ProductQuantity', [
            //TODO: different layout for quantity already in cart
            m(QuantityInput, {
                value: this.cartQuantity,
                onchange: (value: number) => {
                    this.cartQuantity = value;
                },
                product,
                min: 0,
            }),
            Button.component({
                className: 'Button Button--primary Button--block',
                disabled: this.cartQuantity === product.cartQuantity(),
                loading: this.savingQuantity,
                onclick: () => {
                    this.savingQuantity = true;

                    product.save({
                        cartQuantity: this.cartQuantity,
                    }).then(() => {
                        this.savingQuantity = false;

                        this.cartQuantity = product.cartQuantity() || 1;

                        m.redraw();

                        app.cart.load();
                    }).catch(error => {
                        this.savingQuantity = false;

                        m.redraw();

                        throw error;
                    });
                },
            }, app.translator.trans(product.cartQuantity() ? 'flamarkt-core.forum.product.updateCartQuantity' : 'flamarkt-core.forum.product.addToCart')),
            product.cartQuantity() ? Button.component({
                className: 'Button Button--block',
                loading: this.savingQuantity,
                onclick: () => {
                    this.savingQuantity = true;

                    product.save({
                        cartQuantity: 0,
                    }).then(() => {
                        this.savingQuantity = false;

                        this.cartQuantity = 1;

                        m.redraw();

                        app.cart.load();
                    }).catch(error => {
                        this.savingQuantity = false;

                        m.redraw();

                        throw error;
                    });
                },
            }, app.translator.trans('flamarkt-core.forum.product.removeFromCart')) : null,
        ]);
    }
}
