import Model from 'flarum/common/Model';
import User from 'flarum/common/models/User';
import OrderLine from './OrderLine';
import Payment from './Payment';
import DateFormat from '../../forum/utils/DateFormat';

export default class Order extends Model {
    number = Model.attribute<string>('number');
    slug = Model.attribute<string>('slug');
    productCount = Model.attribute<number>('productCount');
    priceTotal = Model.attribute<number>('priceTotal');
    paidAmount = Model.attribute<number>('paidAmount');
    createdAt = Model.attribute('createdAt', Model.transformDate);
    isHidden = Model.attribute<boolean>('isHidden');

    user = Model.hasOne<User>('user');
    lines = Model.hasMany<OrderLine>('lines');
    payments = Model.hasMany<Payment>('payments');

    titleDate(): string {
        const date = this.createdAt();

        if (date) {
            return dayjs(date).format(DateFormat.orderDayFormat());
        }

        return '<not dated>';
    }

    apiEndpoint() {
        // @ts-ignore data.id not type-hinted for non-existent models
        return '/flamarkt/orders' + (this.exists ? '/' + this.data.id : '');
    }
}
