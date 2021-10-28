import { Vnode } from 'mithril';
import Page from 'flarum/common/components/Page';
import ProductListState from '../../common/states/ProductListState';
export default class ProductIndexPage extends Page {
    state: ProductListState;
    oninit(vnode: Vnode): void;
    initState(): ProductListState;
    view(): Vnode<any, any>;
}
