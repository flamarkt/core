import Component from 'flarum/common/Component';
import ItemList from 'flarum/common/utils/ItemList';
import Order from '../../common/models/Order';
export interface OrderPaymentSectionAttrs {
    order: Order;
}
export default class OrderPaymentSection extends Component<OrderPaymentSectionAttrs> {
    view(): any;
    fields(): ItemList<any>;
}
