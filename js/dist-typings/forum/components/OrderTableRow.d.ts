/// <reference types="mithril" />
import Component, { ComponentAttrs } from 'flarum/common/Component';
import OrderLine from '../../common/models/OrderLine';
import ItemList from 'flarum/common/utils/ItemList';
interface OrderTableRowAttrs extends ComponentAttrs {
    line: OrderLine;
}
export default class OrderTableRow extends Component<OrderTableRowAttrs> {
    view(): import("mithril").Vnode<any, any>;
    columns(): ItemList;
    productContent(): (string | import("mithril").Vnode<any, any> | import("mithril").Vnode<{
        href: string;
    }, unknown> | null)[];
    labelContent(): string | import("mithril").Vnode<any, any> | import("mithril").Vnode<{
        href: string;
    }, unknown>;
    commentContent(): import("mithril").Vnode<any, any> | null;
}
export {};
