import Model from 'flarum/common/Model';
export declare class Page<T extends Model> {
    number: number;
    items: T[];
    links: any;
    constructor(number: number, items: T[], links?: any);
}
export default class AbstractListState<T extends Model> {
    params: any;
    pages: Page<T>[];
    loading: boolean;
    moreResults: boolean;
    constructor(params?: any);
    type(): string;
    limit(): number;
    requestParams(): any;
    clear(): void;
    refresh({ deferClear }?: {
        deferClear?: boolean | undefined;
    }): Promise<void>;
    loadResults(offset: number): Promise<any>;
    loadMore(): void;
    parseResults(results: any, number: number): any;
    remove(model: T): void;
    add(model: T): void;
}
