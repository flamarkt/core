import AdminNav from 'flarum/admin/components/AdminNav';
import ItemList from 'flarum/common/utils/ItemList';
export default class BackofficeNav extends AdminNav {
    query: string;
    oninit(vnode: any): void;
    items(): ItemList;
    extensions(): any[];
    extensionItems(): ItemList;
}
