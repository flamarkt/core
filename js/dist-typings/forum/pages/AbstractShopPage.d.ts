import { Children } from 'mithril';
import Page from 'flarum/common/components/Page';
import ItemList from 'flarum/common/utils/ItemList';
/**
 * @deprecated replaced by Layout
 */
export default abstract class AbstractShopPage extends Page {
    view(): import("mithril").Vnode<any, any>;
    sidebarItems(): ItemList;
    breadcrumbItems(): ItemList;
    abstract content(): Children;
}
