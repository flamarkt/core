import Model from 'flarum/common/Model';

export class Page<T extends Model> {
    number: number;
    items: T[];
    links: any;

    constructor(number: number, items: T[], links: any = {}) {
        this.number = number;
        this.items = items;
        this.links = links || {};
    }
}

export default class AbstractListState<T extends Model> {
    params: any = {};
    pages: Page<T>[] = [];
    loading: boolean = true;
    moreResults: boolean = false;

    constructor(params: any = {}) {
        this.params = params;
    }

    type(): string {
        return '';
    }

    limit(): number {
        return 20;
    }

    requestParams() {
        const params: any = {filter: this.params.filter || {}};

        if (this.params.sort) {
            params.sort = this.params.sort;
        }

        if (this.params.q) {
            params.filter.q = this.params.q;
        }

        return params;
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

        return this.loadResults(0).then(
            results => {
                this.pages = [];
                this.parseResults(results, 0);
            },
            () => {
                this.loading = false;
                m.redraw();
            }
        );
    }

    loadResults(offset: number) {
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

    parseResults(results: any, number: number) {
        if (results.length) {
            this.pages.push(new Page(number, results, results.payload.links));
        }

        this.moreResults = results.payload.links && !!results.payload.links.next;

        this.loading = false;

        m.redraw();

        return results;
    }

    remove(model: T) {
        this.pages.forEach(page => {
            const index = page.items.indexOf(model);

            if (index !== -1) {
                page.items.splice(index, 1);
            }
        });
    }

    add(model: T) {
        this.pages[0].items.unshift(model);
    }
}
