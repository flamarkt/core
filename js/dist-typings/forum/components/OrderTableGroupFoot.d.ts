import Component, { ComponentAttrs } from 'flarum/common/Component';
import OrderLine from '../../common/models/OrderLine';
import ItemList from 'flarum/common/utils/ItemList';
interface OrderTableGroupFootAttrs extends ComponentAttrs {
    group: string | null;
    lines: OrderLine[];
}
export default class OrderTableGroupFoot extends Component<OrderTableGroupFootAttrs> {
    view(): any;
    visible(): boolean;
    subtotal(): number;
    columns(): ItemList<any>;
}
export {};
