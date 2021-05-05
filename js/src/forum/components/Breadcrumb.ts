import Component, {ComponentAttrs} from 'flarum/common/Component';
import listItems from 'flarum/common/helpers/listItems';
import ItemList from 'flarum/common/utils/ItemList';

interface BreadcrumbAttrs extends ComponentAttrs {
    items: ItemList,
}

export default class Breadcrumb extends Component<BreadcrumbAttrs> {
    view() {
        return m('ul.breadcrumb', listItems(this.items().toArray()));
    }

    items(): ItemList {
        return this.attrs.items;
    }
}
