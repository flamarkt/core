import Model from 'flarum/common/Model';
import Product from './Product';
export default class Cart extends Model {
    productCount: () => number;
    priceTotal: () => number;
    amountDueAfterPartial: () => number;
    canAddProducts: () => boolean;
    canCheckout: () => boolean;
    isLocked: () => boolean;
    products: () => false | (Product | undefined)[];
    priceTotalLocal(): number;
    apiEndpoint(): string;
}
