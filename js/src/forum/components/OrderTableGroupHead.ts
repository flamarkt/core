import Component, {ComponentAttrs} from 'flarum/common/Component';
import OrderLine from '../../common/models/OrderLine';
import ItemList from 'flarum/common/utils/ItemList';

interface OrderTableGroupHeadAttrs extends ComponentAttrs {
    group: string | null
    lines: OrderLine[]
}

export default class OrderTableGroupHead extends Component<OrderTableGroupHeadAttrs> {
    view() {
        if (!this.visible()) {
            return null;
        }

        return m('tr', this.columns().toArray());
    }

    visible(): boolean {
        return false;
    }

    columns(): ItemList<any> {
        const columns = new ItemList();

        columns.add('number', m('th'), 100);
        columns.add('product', m('th'), 30);
        columns.add('priceUnit', m('th'), -30);
        columns.add('quantity', m('th'), -60);
        columns.add('priceTotal', m('th'), -90);

        return columns;
    }
}
