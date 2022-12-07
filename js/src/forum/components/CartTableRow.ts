import app from 'flarum/forum/app';
import Component, {ComponentAttrs} from 'flarum/common/Component';
import Button from 'flarum/common/components/Button';
import Link from 'flarum/common/components/Link';
import Tooltip from 'flarum/common/components/Tooltip';
import ItemList from 'flarum/common/utils/ItemList';
import Product from '../../common/models/Product';
import QuantityInput from '../../common/components/QuantityInput';
import PriceLabel from '../../common/components/PriceLabel';
import InlineSubmitStatus from './InlineSubmitStatus';

interface CartTableRowAttrs extends ComponentAttrs {
    product: Product,
}

export default class CartTableRow extends Component<CartTableRowAttrs> {
    quantity: number = 0
    quantitySaving: boolean = false
    quantitySaveResult: 'success' | 'error' | null = null
    quantityChangeDebounce: number = 0

    oninit(vnode: any) {
        super.oninit(vnode);

        this.quantity = this.attrs.product.cartQuantity() || 0;
    }

    view() {
        return m('tr', this.columns().toArray());
    }

    columns(): ItemList<any> {
        const columns = new ItemList();

        const {product} = this.attrs;

        columns.add('product', m('td', m(Link, {
            href: app.route.product(product),
        }, product.title())));
        columns.add('quantity', m('td', [
            m(QuantityInput, {
                className: 'CartTableQuantity',
                value: this.quantity,
                onchange: (value: number) => {
                    this.quantity = value;

                    clearTimeout(this.quantityChangeDebounce);
                    this.quantityChangeDebounce = 0;

                    // Debounce quantity change so we don't get ton of requests if repeatedly pressing up or down in the input
                    this.quantityChangeDebounce = setTimeout(() => {
                        this.quantityChangeDebounce = 0;
                        this.submitQuantity(value);
                        m.redraw();
                    }, 500) as any;
                },
                product,
                min: 0,
                disabled: this.quantityEditDisabled(),
            }),
            m(InlineSubmitStatus, {
                // Show feedback immediately if a debounce is active even though the request has not really started yet
                loading: this.quantitySaving || this.quantityChangeDebounce > 0,
                result: this.quantitySaveResult,
            }),
        ]));
        columns.add('total', m('td', m(PriceLabel, {
            value: product.cartPriceTotalLocal(),
            hint: 'cart product total',
            product,
        })));
        columns.add('delete', m('td', Tooltip.component({
            text: this.deleteTooltipText(),
        }, Button.component({
            className: 'Button Button--icon',
            icon: 'fas fa-times',
            disabled: this.deleteDisabled(),
            onclick: () => {
                this.submitQuantity(0);
            },
        }))));

        return columns;
    }

    quantityEditDisabled(): boolean {
        return !this.attrs.product.canOrder();
    }

    deleteDisabled(): boolean {
        return !this.attrs.product.canOrder();
    }

    deleteTooltipText(): string {
        return 'Remove from cart';
    }

    submitQuantity(quantity: number) {
        this.quantitySaving = true;
        this.quantitySaveResult = null;

        this.attrs.product.save({
            cartQuantity: quantity,
        }).then(this.submitQuantityDone.bind(this)).catch(this.submitQuantityError.bind(this));
    }

    submitQuantityDone(product: Product) {
        this.quantity = product.cartQuantity() || 0;
        this.quantitySaving = false;
        this.quantitySaveResult = 'success';

        setTimeout(() => {
            this.quantitySaveResult = null;
            m.redraw();
        }, 2000);

        m.redraw();

        // If a product was removed, reload full cart
        if (this.quantity === 0) {
            app.cart.load();
        }
    }

    submitQuantityError(error: any) {
        this.quantitySaving = false;
        this.quantitySaveResult = 'error';

        setTimeout(() => {
            this.quantitySaveResult = null;
            m.redraw();
        }, 5000);

        m.redraw();

        throw error;
    }
}
