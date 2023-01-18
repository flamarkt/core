import app from 'flarum/forum/app';
import Component, {ComponentAttrs} from 'flarum/common/Component';
import LinkButton from 'flarum/common/components/LinkButton';
import CartState from '../states/CartState';
import ItemList from 'flarum/common/utils/ItemList';

interface CartListAttrs extends ComponentAttrs {
    state: CartState
}

export default class CartList extends Component<CartListAttrs> {
    attrs!: CartListAttrs;

    view() {
        return m('.CartDropdownList', this.items().toArray());
    }

    showCartContents(): boolean {
        return !!this.attrs.state.cart?.canAddProducts();
    }

    items(): ItemList<any> {
        const items = new ItemList();

        if (this.showCartContents()) {
            items.add('products', m('p', app.translator.trans('flamarkt-core.forum.cartDropdown.products', {
                count: this.attrs.state.productCount() || 0,
            })), 10);

            items.add('link', LinkButton.component({
                className: 'Button Button--primary Button--block',
                href: app.route('flamarkt.cart'),
            }, app.translator.trans('flamarkt-core.forum.cartDropdown.action')), -10);
        } else {
            items.add('guest', m('p', app.translator.trans('flamarkt-core.forum.cartDropdown.guest')), 20);
        }

        return items;
    }
}
