import Model from 'flarum/common/Model';

export default class Payment extends Model {
    method = Model.attribute<string | null>('method');
    identifier = Model.attribute<string | null>('identifier');
    amount = Model.attribute<number | null>('amount');
    createdAt = Model.attribute('createdAt', Model.transformDate);
    isHidden = Model.attribute<boolean>('isHidden');

    apiEndpoint() {
        // @ts-ignore data.id not type-hinted for non-existent models
        return '/flamarkt/payments' + (this.exists ? '/' + this.data.id : '');
    }
}
