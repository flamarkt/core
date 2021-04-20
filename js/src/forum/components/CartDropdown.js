import Dropdown from 'flarum/common/components/Dropdown';
import icon from 'flarum/common/helpers/icon';
import CartList from './CartList';
import formatPrice from '../../common/helpers/formatPrice';

// Based on Flarum's NotificationsDropdown
export default class CartDropdown extends Dropdown {
    static initAttrs(attrs) {
        attrs.className = attrs.className || 'CartDropdown';
        attrs.buttonClassName = attrs.buttonClassName || 'Button Button--flat';
        attrs.menuClassName = attrs.menuClassName || 'Dropdown-menu--right';
        attrs.label = attrs.label || 'Cart';//TODO
        attrs.icon = attrs.icon || 'fas fa-shopping-cart';

        super.initAttrs(attrs);
    }

    getButton(children) {
        return m('a.Dropdown-toggle', {
            className: this.attrs.buttonClassName,
            'data-toggle': 'dropdown',
            onclick: this.onclick.bind(this),
            title: this.attrs.label,
            href: app.route('cart'),
        }, this.getButtonContent(children));
    }

    getButtonContent(children) {
        const price = this.attrs.state.priceTotal() || 0;

        return [
            icon(this.attrs.icon, {className: 'Button-icon'}),
            m('span.Button-label', formatPrice(price)),
        ];
    }

    getMenu() {
        return (
            <div className={'Dropdown-menu ' + this.attrs.menuClassName} onclick={this.menuClick.bind(this)}>
                {this.showing ? CartList.component({state: this.attrs.state}) : ''}
            </div>
        );
    }

    onclick(event) {
        event.preventDefault();

        if (app.drawer.isOpen()) {
            this.goToRoute();
        } else {
            this.attrs.state.load();
        }
    }

    goToRoute() {
        m.route.set(app.route('cart'));
    }

    menuClick(e) {
        // Don't close the notifications dropdown if the user is opening a link in a new tab or window.
        if (e.shiftKey || e.metaKey || e.ctrlKey || e.which === 2) e.stopPropagation();
    }
}
