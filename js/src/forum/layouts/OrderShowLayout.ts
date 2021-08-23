import AbstractAccountLayout, {AbstractAccountLayoutAttrs} from './AbstractAccountLayout';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import Order from '../../common/models/Order';
import OrderTable from '../components/OrderTable';

export interface OrderShowLayoutAttrs extends AbstractAccountLayoutAttrs {
    order?: Order,
}

export default class OrderShowLayout extends AbstractAccountLayout<OrderShowLayoutAttrs> {
    className() {
        return 'OrderShowPage';
    }

    title() {
        return this.attrs.order ? app.translator.trans('flamarkt-core.forum.order.headingTitle', {
            number: this.attrs.order.number(),
        }) : 'Order';
    }

    content() {
        if (!this.attrs.order) {
            return LoadingIndicator.component();
        }

        return OrderTable.component({
            order: this.attrs.order,
        });
    }
}
