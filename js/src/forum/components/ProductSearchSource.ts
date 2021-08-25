import {Vnode} from 'mithril';
import {SearchSource} from 'flarum/forum/components/Search';
import Link from 'flarum/common/components/Link';
import highlight from 'flarum/common/helpers/highlight';
import ItemList from 'flarum/common/utils/ItemList';
import LinkButton from 'flarum/common/components/LinkButton';
import Product from '../../common/models/Product';

export default class ProductSearchSource implements SearchSource {
    protected results = new Map<string, Product[]>();

    search(query: string) {
        return app.store
            .find('flamarkt/products', {
                filter: {q: query},
                page: {limit: 5},
            })
            .then((results) => {
                this.results.set(query, results);
                m.redraw();
            });
    }

    view(query: string): Array<Vnode> {
        query = query.toLowerCase();

        const results = (this.results.get(query) || []).map(product => {
            return m('li.UserSearchResult', {
                'data-index': 'products' + product.id(),
            }, m(Link, {
                href: app.route.product(product),
            }, this.product(product, query).toArray()))
        });

        return [
            m('li.Dropdown-header', app.translator.trans('flamarkt-core.forum.search.products.heading')),
            m('li', LinkButton.component({
                icon: 'fas fa-search',
                href: app.route('flamarkt.products.index', {q: query}),
            }, app.translator.trans('flamarkt-core.forum.search.products.all', {query}))),
            ...results,
        ];
    }

    product(product: Product, query: string): ItemList {
        const items = new ItemList();

        items.add('title', highlight(product.title(), query));

        return items;
    }
}
