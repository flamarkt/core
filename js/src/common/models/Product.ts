import Model from './Model';

export default class Product extends Model {
    title = Model.attribute<string>('title');
    description = Model.attribute<string | null>('description');
    price = Model.attribute<number | null>('price');
    cartQuantity = Model.attribute<number | null>('cartQuantity');

    apiEndpoint() {
        return '/flamarkt/products' + (this.exists ? '/' + this.data.id : '');
    }
}
