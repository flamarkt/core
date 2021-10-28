/// <reference types="mithril" />
import Component, { ComponentAttrs } from 'flarum/common/Component';
import Model from 'flarum/common/Model';
import AbstractListState from '../states/AbstractListState';
export interface SortDropdownAttrs extends ComponentAttrs {
    state: AbstractListState<Model>;
    updateUrl?: boolean;
}
export interface SortOptions {
    [key: string]: string;
}
export default abstract class AbstractSortDropdown<T extends SortDropdownAttrs> extends Component<T> {
    view(): import("mithril").Vnode<{
        className: string;
        buttonClassName: string;
        label: string;
    }, unknown>;
    className(): string;
    activeSort(): string;
    applySort(sort: string): void;
    abstract options(): SortOptions;
    defaultSort(): string;
}
