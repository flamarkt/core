import { Vnode } from 'mithril';
import { SearchSource } from 'flarum/forum/components/Search';
import ItemList from 'flarum/common/utils/ItemList';
import Product from '../../common/models/Product';
export default class ProductSearchSource implements SearchSource {
    protected results: Map<string, Product[]>;
    search(query: string): Promise<void>;
    view(query: string): Array<Vnode>;
    product(product: Product, query: string): ItemList<any>;
}
