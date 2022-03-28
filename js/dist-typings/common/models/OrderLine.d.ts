import Model from 'flarum/common/Model';
import Product from './Product';
export default class OrderLine extends Model {
    number: () => number;
    group: () => string | null;
    type: () => string | null;
    label: () => string | null;
    comment: () => string | null;
    quantity: () => number | null;
    priceUnit: () => number | null;
    priceTotal: () => number | null;
    product: () => false | Product;
}
