import {Vnode} from 'mithril';
import Component, {ComponentAttrs} from 'flarum/common/Component';

interface CartPageSectionAttrs extends ComponentAttrs {
    className: string
    title: string
}

export default class CartPageSection extends Component<CartPageSectionAttrs> {
    view(vnode: Vnode<CartPageSectionAttrs, this>) {
        return m('section', {
            className: 'CartPage-section ' + vnode.attrs.className,
        }, [
            m('h3', vnode.attrs.title),
            vnode.children,
        ]);
    }
}
