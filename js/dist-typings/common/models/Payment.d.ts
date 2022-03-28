import Model from 'flarum/common/Model';
export default class Payment extends Model {
    method: () => string | null;
    identifier: () => string | null;
    amount: () => number | null;
    createdAt: () => Date | null | undefined;
    isHidden: () => boolean;
    apiEndpoint(): string;
}
