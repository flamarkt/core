import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import AbstractShowPage from '../../common/pages/AbstractShowPage';
import Order from '../../common/models/Order';
import formatPrice from "../../common/helpers/formatPrice";

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

        return m('.OrderShowPage', [
            m('h1', this.order.number()),
            m('table', [
                m('thead', m('tr', [
                    m('th'),
                ])),
                m('tbody', (this.order.lines() || []).map(line => m('tr', [
                    m('td', line.number()),
                    m('td', formatPrice(line.priceUnit())),
                    m('td', line.quantity()),
                    m('td', formatPrice(line.priceTotal())),
                ]))),
            ]),
        ]);
    }

}
