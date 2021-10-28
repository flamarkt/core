import { Vnode } from 'mithril';
import ItemList from 'flarum/common/utils/ItemList';
import Model from 'flarum/common/Model';
import Component, { ComponentAttrs } from 'flarum/common/Component';
import AbstractListState from '../../common/states/AbstractListState';
interface AbstractListAttrs<T extends Model> extends ComponentAttrs {
    state: AbstractListState<T>;
}
export default class AbstractList<T extends Model> extends Component<AbstractListAttrs<T>> {
    items(state: AbstractListState<T>): T[];
    topRow(state: AbstractListState<T>): null;
    bottomRowContent(state: AbstractListState<T>): any;
    bottomRow(state: AbstractListState<T>): Vnode<any, any> | null;
    view(vnode: Vnode<AbstractListAttrs<T>>): Vnode<any, any>;
    head(): ItemList;
    row(model: T): Vnode<any, any>;
    rowAttrs(model: T): any;
    columns(model: T): ItemList;
    actions(model: T): ItemList;
}
export {};
