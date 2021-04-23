import Model from './Model';

export default class Cart extends Model {
    productCount = Model.attribute('productCount');
    priceTotal = Model.attribute('priceTotal');

    products = Model.hasMany('products');

    apiEndpoint() {
        return '/flamarkt/carts' + (this.exists ? '/' + this.data.id : '');
    }
}
