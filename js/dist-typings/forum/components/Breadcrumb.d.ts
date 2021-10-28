/// <reference types="mithril" />
import Component, { ComponentAttrs } from 'flarum/common/Component';
import ItemList from 'flarum/common/utils/ItemList';
interface BreadcrumbAttrs extends ComponentAttrs {
    items: ItemList;
}
export default class Breadcrumb extends Component<BreadcrumbAttrs> {
    view(): import("mithril").Vnode<any, any>;
    items(): ItemList;
}
export {};
