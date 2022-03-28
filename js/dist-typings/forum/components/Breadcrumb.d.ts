import Component, { ComponentAttrs } from 'flarum/common/Component';
import ItemList from 'flarum/common/utils/ItemList';
interface BreadcrumbAttrs extends ComponentAttrs {
    items: ItemList<any>;
}
export default class Breadcrumb extends Component<BreadcrumbAttrs> {
    view(): any;
    items(): ItemList<any>;
}
export {};
