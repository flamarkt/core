import app from 'flamarkt/backoffice/backoffice/app';
import AbstractRelationshipSelect from 'flamarkt/backoffice/common/components/AbstractRelationshipSelect';
import highlight from 'flarum/common/helpers/highlight';
import Order from '../../common/models/Order';

export default class OrderRelationshipSelect extends AbstractRelationshipSelect<Order> {
    protected resultsCache = new Map<string, Order[]>();

    search(query: string) {
        if (!query) {
            m.redraw();
            return Promise.resolve();
        }

        return app.store
            .find<Order[]>('flamarkt/orders', {
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

        return results || [];
    }

    item(order: Order, query?: string) {
        return [
            query ? highlight(order.number(), query) : order.number(),
        ];
    }
}
