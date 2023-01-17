import { Children, Vnode } from 'mithril';
import Component, { ComponentAttrs } from 'flarum/common/Component';
import ItemList from 'flarum/common/utils/ItemList';
import Order from '../../common/models/Order';
import Payment from '../../common/models/Payment';
export interface OrderFactsAttrs extends ComponentAttrs {
    order: Order;
}
export default class OrderFacts extends Component<OrderFactsAttrs> {
    view(): any;
    items(): ItemList<Children>;
    shippingInformation(): ItemList<Children>;
    paymentInformation(): ItemList<Children>;
    paymentVisible(payment: Payment): boolean;
    dontWrapContent(vnode: Vnode): boolean;
    wrapContent(...content: Children[]): Children;
}
