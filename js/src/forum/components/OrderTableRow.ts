import app from 'flarum/forum/app';
import Component, {ComponentAttrs} from 'flarum/common/Component';
import Link from 'flarum/common/components/Link';
import OrderLine from '../../common/models/OrderLine';
import ItemList from 'flarum/common/utils/ItemList';
import PriceLabel from '../../common/components/PriceLabel'
import QuantityLabel from '../../common/components/QuantityLabel';
import Order from '../../common/models/Order';

interface OrderTableRowAttrs extends ComponentAttrs {
    line: OrderLine
    order: Order
}

export default class OrderTableRow extends Component<OrderTableRowAttrs> {
    view() {
        return m('tr', this.columns().toArray());
    }

    columns(): ItemList<any> {
        const columns = new ItemList();

        const {line} = this.attrs;
        const product = line.product();

        columns.add('number', m('td', line.number()), 100);
        columns.add('product', m('td', this.productContent()), 30);
        columns.add('priceUnit', m('td', m(PriceLabel, {
            value: line.priceUnit(),
            product,
            hint: 'order line unit',
        })), -30);
        columns.add('quantity', m('td', m(QuantityLabel, {
            value: line.quantity(),
            product,
        })), -60);
        columns.add('priceTotal', m('td', m(PriceLabel, {
            value: line.priceTotal(),
            hint: 'order line total',
            product,
        })), -90);

        return columns;
    }

    productContent() {
        return [
            this.labelContent(),
            this.commentContent(),
        ];
    }

    labelContent() {
        const {line} = this.attrs;

        const product = line.product();

        if (line.type() === 'product' && product) {
            return m(Link, {
                href: app.route.product(product),
            }, product.title());
        }

        return line.label() || m('em', 'N/A');
    }

    commentContent() {
        const {line} = this.attrs;

        if (line.comment()) {
            return m('.comment', line.comment());
        }

        return null;
    }
}
