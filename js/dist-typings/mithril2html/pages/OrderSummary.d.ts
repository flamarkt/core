import { Vnode } from 'mithril';
import Page from 'flarum/common/components/Page';
import Order from '../../common/models/Order';
import ItemList from 'flarum/common/utils/ItemList';
export declare class OrderSummary extends Page {
    order: Order;
    oninit(vnode: Vnode): void;
    view(): Vnode<any, any>;
    sections(): ItemList;
}
