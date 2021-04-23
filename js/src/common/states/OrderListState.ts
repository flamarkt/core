import AbstractListState from './AbstractListState';
import Order from '../models/Order';

export default class OrderListState extends AbstractListState<Order> {
    type() {
        return 'flamarkt/orders';
    }
}
