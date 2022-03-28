import Model from 'flarum/common/Model';
export default class Product extends Model {
    title: () => string;
    slug: () => unknown;
    description: () => string | null;
    descriptionHtml: () => string | null;
    price: () => number | null;
    priceEdit: () => number | null;
    cartQuantity: () => number | null;
    isHidden: () => boolean;
    canOrder: () => number | null;
    canEdit: () => number | null;
    cartPriceTotalLocal(): number;
    apiEndpoint(): string;
}
