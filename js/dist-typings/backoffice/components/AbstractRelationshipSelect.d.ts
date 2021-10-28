import { Children, Vnode, VnodeDOM } from 'mithril';
import Component, { ComponentAttrs } from 'flarum/common/Component';
import Model from 'flarum/common/Model';
import KeyboardNavigatable from '../../common/utils/KeyboardNavigatable';
import ItemList from 'flarum/common/utils/ItemList';
export interface RelationshipSelectAttrs<T> extends ComponentAttrs {
    relationship: T | T[] | null;
    hasOne: boolean;
    onchange: (value: T | T[] | null) => {};
    placeholder?: string;
}
export default abstract class AbstractRelationshipSelect<T extends Model> extends Component<RelationshipSelectAttrs<T>> {
    searchFilter: string;
    debouncedSearchFilter: string;
    searchDebouncer?: number;
    activeListIndex: number;
    inputIsFocused: boolean;
    navigator: KeyboardNavigatable;
    dropdownIsFocused: boolean;
    onmousedown: (event: Event) => void;
    className(): string;
    abstract search(query: string): Promise<void>;
    abstract results(query: string): T[] | null;
    abstract item(model: T, query?: string): Children;
    normalizedValue(): T[];
    setValue(models: T[]): void;
    oninit(vnode: Vnode<RelationshipSelectAttrs<T>, this>): void;
    oncreate(vnode: VnodeDOM<RelationshipSelectAttrs<T>, this>): void;
    onremove(vnode: VnodeDOM<RelationshipSelectAttrs<T>, this>): void;
    indexInSelectedModels(model: T): number;
    addModel(model: T): void;
    removeModel(model: T): void;
    view(): Vnode<any, any>;
    formItems(): ItemList;
    inputItems(): ItemList;
    oninputfocus(): void;
    oninputblur(): void;
    listAvailableModels(models: T[] | null): Children;
    listAvailableModel(model: T, index: number): Vnode<any, any>;
    toggleModel(model: T): void;
    select(e: KeyboardEvent): void;
    getDomElement(index: number): JQuery<HTMLElement>;
    setIndex(index: number, scrollToItem: boolean): void;
    onready(): void;
}
