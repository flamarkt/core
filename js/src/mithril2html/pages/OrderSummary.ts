import {Vnode} from 'mithril';
import Page from 'flarum/common/components/Page';
import Order from '../../common/models/Order';
import OrderTable from 'flamarkt/core/forum/components/OrderTable';
import ItemList from 'flarum/common/utils/ItemList';
import LinkButton from 'flarum/common/components/LinkButton';

export class OrderSummary extends Page {
    order!: Order

    oninit(vnode: Vnode) {
        super.oninit(vnode);

        this.order = app.preloadedApiDocument() as Order;

        const id = m.route.param().id;

        // Only for testing
        if (id) {
            app.store.find('flamarkt/orders', id).then(order => {
                this.order = order;
                m.redraw();
            });
        }
    }

    view() {
        if (!this.order) {
            return m('div', 'There was an error rendering the order');
        }

        return m('div', this.sections().toArray());
    }

    sections(): ItemList {
        const sections = new ItemList();

        sections.add('table', m(OrderTable, {
            order: this.order,
        }), 100);

        sections.add('link', m('div', LinkButton.component({
            href: app.route.order(this.order),
        }, 'Order page')), -100); //TODO: translate

        return sections;
    }
}
