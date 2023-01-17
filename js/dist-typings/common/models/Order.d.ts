import Model from 'flarum/common/Model';
import User from 'flarum/common/models/User';
import OrderLine from './OrderLine';
import Payment from './Payment';
export default class Order extends Model {
    number: () => unknown;
    slug: () => unknown;
    productCount: () => unknown;
    priceTotal: () => unknown;
    paidAmount: () => unknown;
    createdAt: () => Date | null | undefined;
    isHidden: () => boolean;
    user: () => false | User;
    lines: () => false | (OrderLine | undefined)[];
    payments: () => false | (Payment | undefined)[];
    titleDate(): string;
    apiEndpoint(): string;
}
