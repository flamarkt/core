import Model from './Model';
import Product from './Product';

export default class Cart extends Model {
    productCount = Model.attribute<number>('productCount');
    priceTotal = Model.attribute<number>('priceTotal');

    products = Model.hasMany<Product>('products');

    priceTotalLocal(): number {
        return (this.products() || []).reduce((total, product) => total + product.cartPriceTotalLocal(), 0);
    }

    apiEndpoint() {
        return '/flamarkt/carts' + (this.exists ? '/' + this.data.id : '');
    }
}
