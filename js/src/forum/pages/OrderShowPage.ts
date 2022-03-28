import app from 'flarum/forum/app';
import AbstractShowPage from 'flamarkt/backoffice/common/pages/AbstractShowPage';
import Order from '../../common/models/Order';
import OrderShowLayout from '../layouts/OrderShowLayout';
import extractText from 'flarum/common/utils/extractText';

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

        app.setTitle(extractText(app.translator.trans('flamarkt-core.forum.order.browserTitle', {
            number: this.order.number(),
        })));
        app.setTitleCount(0);
    }

    view() {
        return OrderShowLayout.component({
            order: this.order,
        })
    }
}
