import Model from 'flarum/common/Model';
import User from 'flarum/common/models/User';
import OrderLine from './OrderLine';
import Payment from './Payment';

export default class Order extends Model {
    number = Model.attribute('number');
    slug = Model.attribute('slug');
    productCount = Model.attribute('productCount');
    priceTotal = Model.attribute('priceTotal');
    paidAmount = Model.attribute('paidAmount');
    createdAt = Model.attribute('createdAt', Model.transformDate);
    isHidden = Model.attribute<boolean>('isHidden');

    user = Model.hasOne<User>('user');
    lines = Model.hasMany<OrderLine>('lines');
    payments = Model.hasMany<Payment>('payments');

    apiEndpoint() {
        // @ts-ignore data.id not type-hinted for non-existent models
        return '/flamarkt/orders' + (this.exists ? '/' + this.data.id : '');
    }
}
