import { Children, Vnode } from 'mithril';
import Component, { ComponentAttrs } from 'flarum/common/Component';
import ItemList from 'flarum/common/utils/ItemList';
export interface AbstractShopLayoutAttrs extends ComponentAttrs {
}
export default abstract class AbstractShopLayout<T = AbstractShopLayoutAttrs> extends Component<T> {
    attrs: T;
    view(vnode: Vnode): Vnode<any, any>;
    sidebarItems(): ItemList;
    breadcrumbItems(): ItemList;
    className(): string;
    /**
     * Used as the breadcrumb current item as well as the <h1> title of the content
     * The title of the browser page needs to be set in the page itself and not the layout
     */
    title(): string;
    /**
     * Used as a hint for the breadcrumb to not repeat an existing item if it happens to be the same as the active page
     */
    currentPageHref(): string | null;
    contentTitle(): Vnode<any, any> | null;
    abstract content(vnode: Vnode): Children;
}
