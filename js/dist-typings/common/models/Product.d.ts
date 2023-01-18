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
    canAddToCart: () => number | null;
    /**
     * @deprecated Use canAddToCart instead. Behaviour will probably change in the future to differentiate products that can be added to cart but not actually ordered.
     */
    canOrder: () => number | null;
    canEdit: () => number | null;
    cartPriceTotalLocal(): number;
    apiEndpoint(): string;
}
