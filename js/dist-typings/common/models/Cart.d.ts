import Model from './Model';
import Product from './Product';
export default class Cart extends Model {
    productCount: (value?: string | undefined) => number | undefined;
    priceTotal: (value?: string | undefined) => number | undefined;
    products: () => false | Product[];
    priceTotalLocal(): number;
    apiEndpoint(): string;
}
