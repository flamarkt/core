import { Vnode } from 'mithril';
import Page from 'flarum/common/components/Page';
import ProductGridListState from '../states/ProductGridListState';
export default class ProductIndexPage extends Page {
    state: ProductGridListState;
    oninit(vnode: Vnode): void;
    initState(): ProductGridListState;
    view(): Mithril.Vnode;
}
