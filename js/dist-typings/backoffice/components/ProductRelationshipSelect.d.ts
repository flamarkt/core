import AbstractRelationshipSelect from 'flamarkt/backoffice/common/components/AbstractRelationshipSelect';
import Product from '../../common/models/Product';
export default class ProductRelationshipSelect extends AbstractRelationshipSelect<Product> {
    protected resultsCache: Map<string, Product[]>;
    search(query: string): Promise<void>;
    results(query: string): Product[] | null;
    item(product: Product, query?: string): any[];
}
