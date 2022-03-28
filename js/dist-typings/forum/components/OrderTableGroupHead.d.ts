import Component, { ComponentAttrs } from 'flarum/common/Component';
import OrderLine from '../../common/models/OrderLine';
import ItemList from 'flarum/common/utils/ItemList';
interface OrderTableGroupHeadAttrs extends ComponentAttrs {
    group: string | null;
    lines: OrderLine[];
}
export default class OrderTableGroupHead extends Component<OrderTableGroupHeadAttrs> {
    view(): any;
    visible(): boolean;
    columns(): ItemList<any>;
}
export {};
