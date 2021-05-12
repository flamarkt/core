import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import AbstractShowPage from '../../common/pages/AbstractShowPage';
import Order from '../../common/models/Order';
import OrderTable from '../components/OrderTable';

export default class OrderShowPage extends AbstractShowPage {
    order: Order | null = null;

    findType() {
        return 'flamarkt/orders';
    }

    show(order: Order) {
        this.order = order;

        //app.setTitle(order.title());
        app.setTitleCount(0);
    }

    view() {
        if (!this.order) {
            return LoadingIndicator.component();
        }

        return m('.OrderShowPage', m('.container', [
            m('h1', this.order.number()),
            OrderTable.component({
                order: this.order,
            }),
        ]));
    }
}
