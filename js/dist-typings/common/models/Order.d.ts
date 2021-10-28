import Model from './Model';
import User from 'flarum/common/models/User';
import OrderLine from './OrderLine';
export default class Order extends Model {
    number: (value?: string | undefined) => any;
    slug: (value?: string | undefined) => any;
    productCount: (value?: string | undefined) => any;
    priceTotal: (value?: string | undefined) => any;
    paidAmount: (value?: string | undefined) => any;
    createdAt: (value?: string | undefined) => any;
    isHidden: (value?: string | undefined) => boolean | undefined;
    user: () => false | User | undefined;
    lines: () => false | OrderLine[];
    payments: () => false | import("flarum/common/Model").default[];
    apiEndpoint(): string;
}
