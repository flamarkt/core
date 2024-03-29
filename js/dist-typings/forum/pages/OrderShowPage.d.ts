import AbstractShowPage from 'flamarkt/backoffice/common/pages/AbstractShowPage';
import Order from '../../common/models/Order';
export default class OrderShowPage extends AbstractShowPage {
    order: Order | null;
    findType(): string;
    requestParams(): any;
    show(order: Order): void;
    view(): Mithril.Vnode;
}
