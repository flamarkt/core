import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import Button from 'flarum/common/components/Button';
import AbstractShowPage from '../../common/pages/AbstractShowPage';
import formatPrice from '../../common/helpers/formatPrice';
import Product from '../../common/models/Product';
import ItemList from "flarum/common/utils/ItemList";

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

    breadcrumbItems() {
        //const items = super.breadcrumbItems();
        const items = new ItemList(); //TODO

        if (this.product) {
            items.add('current', m('span.breadcrumb-current', this.product.title()));
        }

        return items;
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
                className: 'Button Button--primary Button--block',
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
            }, app.translator.trans(this.product.cartQuantity() ? 'flamarkt-core.forum.product.updateCartQuantity' : 'flamarkt-core.forum.product.addToCart')),
            this.product.cartQuantity() ? Button.component({
                className: 'Button Button--block',
                loading: this.savingQuantity,
                onclick: () => {
                    this.savingQuantity = true;

                    // @ts-ignore
                    this.product.save({
                        cartQuantity: 0,
                    }).then(() => {
                        this.savingQuantity = false;

                        this.cartQuantity = 1;

                        m.redraw();
                    }).catch(error => {
                        this.savingQuantity = false;

                        m.redraw();

                        throw error;
                    });
                },
            }, app.translator.trans('flamarkt-core.forum.product.removeFromCart')) : null,
        ]) : LoadingIndicator.component({
            className: 'LoadingIndicator--block',
        }));
    }
}
