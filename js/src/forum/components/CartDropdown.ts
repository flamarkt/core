import app from 'flarum/forum/app';
import {ComponentAttrs} from 'flarum/common/Component';
import Dropdown from 'flarum/common/components/Dropdown';
import icon from 'flarum/common/helpers/icon';
import extractText from 'flarum/common/utils/extractText';
import CartList from './CartList';
import CartState from '../states/CartState';
import PriceLabel from '../../common/components/PriceLabel';

interface CartDropdownAttrs extends ComponentAttrs {
    className: string
    buttonClassName: string
    menuClassName: string
    label: string
    icon: string
    state: CartState
}

// Based on Flarum's NotificationsDropdown
// @ts-ignore
export default class CartDropdown extends Dropdown {
    attrs!: CartDropdownAttrs

    static initAttrs(attrs: CartDropdownAttrs) {
        attrs.className = attrs.className || 'CartDropdown';
        attrs.buttonClassName = attrs.buttonClassName || 'Button Button--flat';
        attrs.menuClassName = attrs.menuClassName || 'Dropdown-menu--right';
        attrs.label = attrs.label || extractText(app.translator.trans('flamarkt-core.forum.cartDropdown.label'));

        super.initAttrs(attrs);
    }

    getButton(children: any) {
        return m('a.Dropdown-toggle', {
            className: this.attrs.buttonClassName,
            'data-toggle': 'dropdown',
            onclick: this.onclick.bind(this),
            title: this.attrs.label,
            href: app.route('flamarkt.cart'),
        }, this.getButtonContent(children));
    }

    getButtonContent(children: any) {
        let iconName = 'fas fa-shopping-cart';

        if (this.attrs.state.loading) {
            iconName = 'fas fa-spinner fa-pulse';
        }

        return [
            icon(iconName, {className: 'Button-icon'}),
            m('span.Button-label', m(PriceLabel, {
                value: this.attrs.state.priceTotal() || 0,
                hint: 'cart dropdown',
            })),
        ];
    }

    getMenu() {
        return m('.Dropdown-menu', {
            className: this.attrs.menuClassName,
            onclick: this.menuClick.bind(this)
        }, this.showing ? CartList.component({state: this.attrs.state}) : null);
    }

    onclick(event: Event) {
        event.preventDefault();

        if (app.drawer.isOpen()) {
            // On mobile, go directly to cart page
            this.goToRoute();
        } else if (!this.showing) {
            // Only when opening the dropdown, refresh state
            this.attrs.state.load();
        }
    }

    goToRoute() {
        m.route.set(app.route('flamarkt.cart'));
    }

    menuClick(e: MouseEvent) {
        // Don't close the notifications dropdown if the user is opening a link in a new tab or window.
        if (e.shiftKey || e.metaKey || e.ctrlKey || e.which === 2) e.stopPropagation();
    }
}
