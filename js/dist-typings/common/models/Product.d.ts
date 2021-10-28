import Model from './Model';
export default class Product extends Model {
    title: (value?: string | undefined) => string | undefined;
    slug: (value?: string | undefined) => any;
    description: (value?: string | undefined) => string | null | undefined;
    descriptionHtml: (value?: string | undefined) => string | null | undefined;
    price: (value?: string | undefined) => number | null | undefined;
    priceEdit: (value?: string | undefined) => number | null | undefined;
    cartQuantity: (value?: string | undefined) => number | null | undefined;
    isHidden: (value?: string | undefined) => boolean | undefined;
    canOrder: (value?: string | undefined) => number | null | undefined;
    canEdit: (value?: string | undefined) => number | null | undefined;
    cartPriceTotalLocal(): number;
    apiEndpoint(): string;
}
