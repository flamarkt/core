import * as Mithril from 'mithril';
import Component, { ComponentAttrs } from 'flarum/common/Component';
interface CartPageSectionAttrs extends ComponentAttrs {
    className: string;
    title: string;
}
export default class CartPageSection extends Component<CartPageSectionAttrs> {
    view(vnode: Mithril.Vnode<CartPageSectionAttrs, this>): Mithril.Vnode<any, any>;
}
export {};
