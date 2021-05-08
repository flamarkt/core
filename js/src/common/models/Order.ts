import Model from './Model';
import User from 'flarum/common/models/User';
import OrderLine from './OrderLine';

export default class Order extends Model {
    number = Model.attribute('number');
    createdAt = Model.attribute('createdAt', Model.transformDate);

    user = Model.hasOne<User>('user');
    lines = Model.hasMany<OrderLine>('lines');
    payments = Model.hasMany('payments');

    apiEndpoint() {
        return '/flamarkt/orders' + (this.exists ? '/' + this.data.id : '');
    }
}