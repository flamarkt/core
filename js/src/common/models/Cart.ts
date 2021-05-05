import Model from './Model';
import Product from './Product';

export default class Cart extends Model {
    productCount = Model.attribute<number>('productCount');
    priceTotal = Model.attribute<number>('priceTotal');

    products = Model.hasMany<Product>('products');

    apiEndpoint() {
        return '/flamarkt/carts' + (this.exists ? '/' + this.data.id : '');
    }
}
