import Model from './Model';
import Product from './Product';

export default class OrderLine extends Model {
    number = Model.attribute<number>('number');
    group = Model.attribute<string | null>('group');
    type = Model.attribute<string | null>('type');
    label = Model.attribute<string | null>('label');
    comment = Model.attribute<string | null>('comment');
    quantity = Model.attribute<number | null>('quantity');
    priceUnit = Model.attribute<number | null>('priceUnit');
    priceTotal = Model.attribute<number | null>('priceTotal');

    product = Model.hasOne<Product>('product');
}
