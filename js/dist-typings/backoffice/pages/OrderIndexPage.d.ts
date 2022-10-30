import { Vnode } from 'mithril';
import Page from 'flarum/common/components/Page';
import ItemList from 'flarum/common/utils/ItemList';
import OrderListState from '../../common/states/OrderListState';
export default class OrderIndexPage extends Page {
    list: OrderListState;
    oninit(vnode: Vnode): void;
    initState(): OrderListState;
    filters(): ItemList<unknown>;
    view(): any;
}
