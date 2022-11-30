import { Vnode } from 'mithril';
import Page from 'flarum/common/components/Page';
import Product from '../../common/models/Product';
import ItemList from 'flarum/common/utils/ItemList';
export declare class ProductSummary extends Page {
    product: Product | null;
    oninit(vnode: Vnode): void;
    view(): any;
    sections(): ItemList<any>;
}
