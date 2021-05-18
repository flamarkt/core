import Model from './Model';

export default class Product extends Model {
    title = Model.attribute<string>('title');
    description = Model.attribute<string | null>('description');
    descriptionHtml = Model.attribute<string | null>('descriptionHtml');
    price = Model.attribute<number | null>('price');
    cartQuantity = Model.attribute<number | null>('cartQuantity');

    cartPriceTotalLocal(): number {
        if (!this.price || !this.cartQuantity) {
            return 0;
        }

        // @ts-ignore Wrong Model.attribute typings
        return this.price() * this.cartQuantity();
    }

    apiEndpoint() {
        return '/flamarkt/products' + (this.exists ? '/' + this.data.id : '');
    }
}
