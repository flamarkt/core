import app from 'flamarkt/backoffice/backoffice/app';
import AbstractRelationshipSelect from 'flamarkt/backoffice/common/components/AbstractRelationshipSelect';
import highlight from 'flarum/common/helpers/highlight';
import Product from '../../common/models/Product';

export default class ProductRelationshipSelect extends AbstractRelationshipSelect<Product> {
    protected resultsCache = new Map<string, Product[]>();

    search(query: string) {
        if (!query) {
            m.redraw();
            return Promise.resolve();
        }

        return app.store
            .find<Product[]>('flamarkt/products', {
                filter: {q: query},
                page: {limit: 5},
            })
            .then((results) => {
                this.resultsCache.set(query, results);
                m.redraw();
            });
    }

    results(query: string) {
        if (!query) {
            return [];
        }

        query = query.toLowerCase();

        const results = this.resultsCache.get(query);

        // Indicates still loading
        if (typeof results === 'undefined') {
            return null;
        }

        return (results || [])
            .concat(
                app.store
                    .all<Product>('flamarkt-products')
                    .filter(product => product.title().toLowerCase().substr(0, query.length) === query)
            )
            .filter((e, i, arr) => arr.lastIndexOf(e) === i)
            .sort((a, b) => a.title().localeCompare(b.title()));
    }

    item(product: Product, query?: string) {
        return [
            query ? highlight(product.title(), query) : product.title(),
        ];
    }
}
