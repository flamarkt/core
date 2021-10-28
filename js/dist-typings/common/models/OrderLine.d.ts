import Model from './Model';
import Product from './Product';
export default class OrderLine extends Model {
    number: (value?: string | undefined) => number | undefined;
    group: (value?: string | undefined) => string | null | undefined;
    type: (value?: string | undefined) => string | null | undefined;
    label: (value?: string | undefined) => string | null | undefined;
    comment: (value?: string | undefined) => string | null | undefined;
    quantity: (value?: string | undefined) => number | null | undefined;
    priceUnit: (value?: string | undefined) => number | null | undefined;
    priceTotal: (value?: string | undefined) => number | null | undefined;
    product: () => false | Product | undefined;
}
