import Model from 'flarum/common/Model';

export default class OrderLine extends Model {
    quantity = Model.attribute('quantity');
    priceUnit = Model.attribute('priceUnit');
    priceTotal = Model.attribute('priceTotal');

    product = Model.hasOne('product');
}
