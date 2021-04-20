import Model from 'flarum/common/Model';

export default class Product extends Model {
    title = Model.attribute('title');
    description = Model.attribute('description');
    price = Model.attribute('price');
    cartQuantity = Model.attribute('cartQuantity');

    apiEndpoint() {
        return '/flamarkt/products' + (this.exists ? '/' + this.data.id : '');
    }
}
