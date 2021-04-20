import AbstractListState from './AbstractListState';

export default class OrderListState extends AbstractListState {
    type() {
        return 'flamarkt/orders';
    }
}
