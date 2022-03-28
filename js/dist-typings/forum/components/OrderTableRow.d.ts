import Component, { ComponentAttrs } from 'flarum/common/Component';
import OrderLine from '../../common/models/OrderLine';
import ItemList from 'flarum/common/utils/ItemList';
interface OrderTableRowAttrs extends ComponentAttrs {
    line: OrderLine;
}
export default class OrderTableRow extends Component<OrderTableRowAttrs> {
    view(): any;
    columns(): ItemList<any>;
    productContent(): any[];
    labelContent(): any;
    commentContent(): any;
}
export {};
