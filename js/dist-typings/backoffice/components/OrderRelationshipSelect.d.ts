import AbstractRelationshipSelect from 'flamarkt/backoffice/common/components/AbstractRelationshipSelect';
import Order from '../../common/models/Order';
export default class OrderRelationshipSelect extends AbstractRelationshipSelect<Order> {
    protected resultsCache: Map<string, Order[]>;
    search(query: string): Promise<void>;
    results(query: string): Order[] | null;
    item(order: Order, query?: string): any[];
}
