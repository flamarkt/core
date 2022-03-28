import AbstractListState from 'flamarkt/backoffice/common/states/AbstractListState';
import Order from '../models/Order';
export default class OrderListState extends AbstractListState<Order> {
    type(): string;
}
