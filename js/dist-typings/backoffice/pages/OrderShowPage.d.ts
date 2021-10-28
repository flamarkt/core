import { Vnode } from 'mithril';
import User from 'flarum/common/models/User';
import ItemList from 'flarum/common/utils/ItemList';
import AbstractShowPage from '../../common/pages/AbstractShowPage';
import Order from '../../common/models/Order';
import OrderLine from '../../common/models/OrderLine';
import OrderLineEditState from '../states/OrderLineEditState';
export default class OrderShowPage extends AbstractShowPage {
    order: Order | null;
    user: User | null;
    lines: OrderLineEditState[];
    saving: boolean;
    dirty: boolean;
    newLine: OrderLineEditState;
    oninit(vnode: Vnode): void;
    initNewLine(): void;
    initLineState(line: OrderLine): OrderLineEditState;
    newRecord(): any;
    findType(): string;
    show(order: Order): void;
    view(): any;
    fields(): ItemList;
    tableHead(): ItemList;
    data(): {
        relationships: {
            lines: any[];
            user: User | null;
        };
    };
    onsubmit(event: Event): void;
}
