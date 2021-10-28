import { Vnode } from 'mithril';
import Page from 'flarum/common/components/Page';
import OrderListState from '../../common/states/OrderListState';
export default class OrderIndexPage extends Page {
    state: OrderListState;
    oninit(vnode: Vnode): void;
    initState(): OrderListState;
    view(): any;
}
