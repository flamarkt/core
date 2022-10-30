import { Vnode } from 'mithril';
import Page from 'flarum/common/components/Page';
import ItemList from 'flarum/common/utils/ItemList';
import ProductListState from '../../common/states/ProductListState';
export default class ProductIndexPage extends Page {
    list: ProductListState;
    oninit(vnode: Vnode): void;
    initState(): ProductListState;
    filters(): ItemList<unknown>;
    view(): any;
}
