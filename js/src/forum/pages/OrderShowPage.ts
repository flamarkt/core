import AbstractShowPage from '../../common/pages/AbstractShowPage';
import Order from '../../common/models/Order';
import OrderShowLayout from '../layouts/OrderShowLayout';

export default class OrderShowPage extends AbstractShowPage {
    order: Order | null = null;

    findType() {
        return 'flamarkt/orders';
    }

    requestParams(): any {
        const params = super.requestParams();

        params.bySlug = true;

        return params;
    }

    show(order: Order) {
        this.order = order;

        app.setTitle(this.order.number());
        app.setTitleCount(0);
    }

    view() {
        return OrderShowLayout.component({
            order: this.order,
        })
    }
}
