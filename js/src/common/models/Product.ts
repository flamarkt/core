import Model from './Model';

export default class Product extends Model {
    title = Model.attribute<string>('title');
    slug = Model.attribute('slug');
    description = Model.attribute<string | null>('description');
    descriptionHtml = Model.attribute<string | null>('descriptionHtml');
    price = Model.attribute<number | null>('price');
    priceEdit = Model.attribute<number | null>('priceEdit');
    cartQuantity = Model.attribute<number | null>('cartQuantity');
    isHidden = Model.attribute<boolean>('isHidden');
    canOrder = Model.attribute<number | null>('canOrder');
    canEdit = Model.attribute<number | null>('canEdit');

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
