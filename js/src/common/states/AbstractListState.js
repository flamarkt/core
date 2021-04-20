export class Page {
    constructor(number, items, links = {}) {
        this.number = number;
        this.items = items;
        this.links = links;
    }
}

export default class AbstractListState {
    constructor(params = {}) {
        this.params = params;
        this.pages = [];
        this.loading = true;
        this.moreResults = false;
    }

    type() {
        return '';
    }

    limit() {
        return 20;
    }

    requestParams() {
        const params = {filter: {}};

        params.sort = this.sortMap()[this.params.sort];

        if (this.params.q) {
            params.filter.q = this.params.q;
        }

        return params;
    }

    sortMap() {
        const map = {};

        map.latest = '-createdAt';
        map.oldest = 'createdAt';
        map.latestTake = '-takenAt';
        map.oldestTake = 'takenAt';

        return map;
    }

    clear() {
        this.pages = [];
        m.redraw();
    }

    refresh({deferClear = false} = {}) {
        this.loading = true;

        if (!deferClear) {
            this.clear();
        }

        return this.loadResults().then(
            results => {
                this.albums = [];
                this.parseResults(results);
            },
            () => {
                this.loading = false;
                m.redraw();
            }
        );
    }

    loadResults(offset) {
        const preloaded = app.preloadedApiDocument();

        if (preloaded) {
            return Promise.resolve(preloaded);
        }

        const params = this.requestParams();
        params.page = {offset};

        return app.store.find(this.type(), params);
    }

    loadMore() {
        this.loading = true;

        const nextPageNumber = this.pages.length;

        this.loadResults(nextPageNumber * this.limit())
            .then(results => {
                this.parseResults(results, nextPageNumber);
            });
    }

    parseResults(results, number) {
        if (results.length) {
            this.pages.push(new Page(number, results, results.payload.links));
        }

        this.moreResults = !!results.payload.links.next;

        this.loading = false;

        m.redraw();

        return results;
    }

    remove(model) {
        this.pages.forEach(page => {
            const index = page.items.indexOf(model);

            if (index !== -1) {
                page.items.splice(index, 1);
            }
        });
    }

    add(model) {
        this.pages[0].items.unshift(model);
    }
}
