import Model from './Model';

export default class Payment extends Model {
    method = Model.attribute<string | null>('method');
    identifier = Model.attribute<string | null>('identifier');
    amount = Model.attribute<number | null>('amount');
    createdAt = Model.attribute('createdAt', Model.transformDate);
    isHidden = Model.attribute<boolean>('isHidden');

    apiEndpoint() {
        return '/flamarkt/payments' + (this.exists ? '/' + this.data.id : '');
    }
}
