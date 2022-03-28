import Model from 'flarum/common/Model';
import Product from './Product';

export default class Cart extends Model {
    productCount = Model.attribute<number>('productCount');
    priceTotal = Model.attribute<number>('priceTotal');

    products = Model.hasMany<Product>('products');

    priceTotalLocal(): number {
        return (this.products() || []).reduce((total, product) => total + (product ? product.cartPriceTotalLocal() : 0), 0);
    }

    apiEndpoint() {
        // @ts-ignore data.id not type-hinted for non-existent models
        return '/flamarkt/carts' + (this.exists ? '/' + this.data.id : '');
    }
}
