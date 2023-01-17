import app from 'flarum/forum/app';
import AbstractAccountLayout, {AbstractAccountLayoutAttrs} from './AbstractAccountLayout';
import LinkButton from 'flarum/common/components/LinkButton';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import ItemList from 'flarum/common/utils/ItemList';
import Order from '../../common/models/Order';
import OrderFacts from '../components/OrderFacts';
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
            date: this.attrs.order.titleDate(),
        }) : 'Order';
    }

    content() {
        if (!this.attrs.order) {
            return LoadingIndicator.component();
        }

        return this.sections().toArray();
    }

    sections(): ItemList<any> {
        const sections = new ItemList();

        const {order} = this.attrs;

        if (app.forum.attribute('backofficeUrl')) {
            sections.add('edit', LinkButton.component({
                className: 'Button',
                href: app.forum.attribute('backofficeUrl') + '/orders/' + order.id(),
                external: true,
            }, 'Edit'), 200);
        }

        sections.add('facts', OrderFacts.component({
            order,
        }), 20);

        sections.add('table', OrderTable.component({
            order,
        }), 10);

        return sections;
    }
}
