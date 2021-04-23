import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import Button from 'flarum/common/components/Button';
import AbstractShowPage from '../../common/pages/AbstractShowPage';
import formatPrice from '../../common/helpers/formatPrice';
import Product from '../../common/models/Product';

export default class ProductShowPage extends AbstractShowPage {
    product: Product | null = null;
    cartQuantity: number = 1;
    savingQuantity: boolean = false;

    oninit(vnode) {
        //app.history.push('product');

        this.bodyClass = 'App--product';

        super.oninit(vnode);
    }

    findType() {
        return 'flamarkt/products';
    }

    show(product) {
        this.product = product;
        this.cartQuantity = product.cartQuantity() || '1';

        //app.history.push('product', product.title());
        app.setTitle(product.title());
        app.setTitleCount(0);
    }

    view() {
        return m('.ProductPage', this.product ? m('.container', [
            m('h1', this.product.title()),
            m('p', formatPrice(this.product.price())),
            //TODO: different layout for quantity already in cart
            m('input.FormControl', {
                type: 'number',
                value: this.cartQuantity + '',
                oninput: event => {
                    this.cartQuantity = parseInt(event.target.value);
                },
            }),
            Button.component({
                className: 'Button Button--primary',
                disabled: this.cartQuantity === this.product.cartQuantity(),
                loading: this.savingQuantity,
                onclick: () => {
                    this.savingQuantity = true;

                    // @ts-ignore
                    this.product.save({
                        cartQuantity: this.cartQuantity,
                    }).then(() => {
                        this.savingQuantity = false;

                        // @ts-ignore
                        this.cartQuantity = this.product.cartQuantity() || 1;

                        m.redraw();
                    }).catch(error => {
                        this.savingQuantity = false;

                        m.redraw();

                        throw error;
                    });
                },
            }, 'Add to cart'),
        ]) : LoadingIndicator.component({
            className: 'LoadingIndicator--block',
        }));
    }
}
