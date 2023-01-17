import { Children, Vnode } from 'mithril';
import Component, { ComponentAttrs } from 'flarum/common/Component';
export interface OrderFactAttrs extends ComponentAttrs {
    title: Children;
    className?: string;
}
/**
 * A component is used because it makes it easier to pass an optional className and provides better extensibility.
 * The component children should be pre-wrapped in <dd>.
 * The helper method OrderFacts.prototype.wrapContent() can be used to achieve that.
 */
export default class OrderFact extends Component<OrderFactAttrs> {
    view(vnode: Vnode): any;
}
