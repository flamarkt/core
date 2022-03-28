import Component, {ComponentAttrs} from 'flarum/common/Component';
import listItems from 'flarum/common/helpers/listItems';
import ItemList from 'flarum/common/utils/ItemList';

interface BreadcrumbAttrs extends ComponentAttrs {
    items: ItemList<any>,
}

export default class Breadcrumb extends Component<BreadcrumbAttrs> {
    view() {
        return m('ul.Breadcrumb', listItems(this.items().toArray()));
    }

    items(): ItemList<any> {
        return this.attrs.items;
    }
}
