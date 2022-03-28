import { ComponentAttrs } from 'flarum/common/Component';
import Dropdown from 'flarum/common/components/Dropdown';
import CartState from '../states/CartState';
interface CartDropdownAttrs extends ComponentAttrs {
    className: string;
    buttonClassName: string;
    menuClassName: string;
    label: string;
    icon: string;
    state: CartState;
}
export default class CartDropdown extends Dropdown {
    attrs: CartDropdownAttrs;
    static initAttrs(attrs: CartDropdownAttrs): void;
    getButton(children: any): any;
    getButtonContent(children: any): any[];
    getMenu(): any;
    onclick(event: Event): void;
    goToRoute(): void;
    menuClick(e: MouseEvent): void;
}
export {};
