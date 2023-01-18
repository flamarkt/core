import Model from 'flarum/common/Model';
import Product from './Product';
export default class Cart extends Model {
    productCount: () => number;
    priceTotal: () => number;
    canAddProducts: () => boolean;
    canCheckout: () => boolean;
    products: () => false | (Product | undefined)[];
    priceTotalLocal(): number;
    apiEndpoint(): string;
}
