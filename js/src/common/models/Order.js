import Model from 'flarum/common/Model';

export default class Order extends Model {
    number = Model.attribute('number');
    createdAt = Model.attribute('createdAt', Model.transformDate);

    user = Model.hasOne('user');
    lines = Model.hasMany('lines');
    payments = Model.hasMany('payments');

    apiEndpoint() {
        return '/flamarkt/orders' + (this.exists ? '/' + this.data.id : '');
    }
}
