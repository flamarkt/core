import {Children, Vnode} from 'mithril';
import Component, {ComponentAttrs} from 'flarum/common/Component';

export interface OrderFactAttrs extends ComponentAttrs {
    title: Children
    className?: string
}

/**
 * A component is used because it makes it easier to pass an optional className and provides better extensibility.
 * The component children should be pre-wrapped in <dd>.
 * The helper method OrderFacts.prototype.wrapContent() can be used to achieve that.
 */
export default class OrderFact extends Component<OrderFactAttrs> {
    view(vnode: Vnode) {
        // The content is wrapped in 2 different DIVs
        // This way if display:table is used on the dl it can be configured to not use the full width
        return m('.FlamarktOrderFact', {
            className: this.attrs.className,
        }, m('dl', [
            m('dt', this.attrs.title),
            vnode.children,
        ]));
    }
}
