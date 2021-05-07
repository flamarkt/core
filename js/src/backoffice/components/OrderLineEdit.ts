import {Attributes, ClassComponent, Vnode} from 'mithril';
import SortableHandle from '../../common/components/SortableHandle';
import formatPrice from '../../common/helpers/formatPrice';
import OrderLine from '../../common/models/OrderLine';
import ItemList from 'flarum/common/utils/ItemList';
import Select from 'flarum/common/components/Select';

interface OrderLineAttrs extends Attributes {
    line: OrderLine
    sortable?: boolean
    control: Vnode
    onchange: () => void
}

export default class OrderLineEdit implements ClassComponent<OrderLineAttrs> {
    view(vnode: Vnode<OrderLineAttrs>) {
        const {line, control, onchange, sortable} = vnode.attrs;

        return m('tr', this.columns(line, control, onchange, sortable).toArray());
    }

    columns(line: OrderLine, control: Vnode, onchange: () => void, sortable?: boolean): ItemList {
        const columns = new ItemList();

        columns.add('handle', m('td', sortable ? m(SortableHandle) : null));
        columns.add('group', m('td', Select.component({
            value: line.group() === null ? '_none' : line.group(),
            onchange: value => {
                line.pushAttributes({
                    group: value,
                });
                onchange();
            },
            options: {
                _none: 'None',
                shipping: 'Shipping',
            },
        })));
        columns.add('type', m('td', Select.component({
            value: line.type(),
            onchange: value => {
                line.pushAttributes({
                    type: value,
                });
                onchange();
            },
            options: {
                product: 'Product',
                manual: 'Manual',
            },
        })));
        columns.add('info', m('td', this.fields(line, onchange).toArray()));
        columns.add('quantity', m('td', line.quantity()));
        columns.add('priceUnit', m('td', line.priceUnit() ? formatPrice(line.priceUnit()) : null));
        columns.add('priceTotal', m('td', line.priceTotal() ? formatPrice(line.priceTotal()) : null));
        columns.add('control', m('td', control));

        return columns;
    }

    showInfoProduct(line) {
        return line.type() === 'product';
    }

    showInfoLabel(line) {
        return line.type() === 'manual';
    }

    showInfoComment(line) {
        return line.type() === 'product' || line.type() === 'manual';
    }

    fields(line: OrderLine, onchange: () => void): ItemList {
        const fields = new ItemList();

        if (this.showInfoProduct(line)) {
            const product = line.product();

            fields.add('product', m('div', product ? product.title() : 'No product'));
        }

        if (this.showInfoLabel(line)) {
            fields.add('label', m('.Form-group', [
                m('label', 'Label'),
                m('input.FormControl', {
                    type: 'text',
                    value: line.label(),
                    onchange: event => {
                        line.pushAttributes({
                            label: event.target.value,
                        });
                        onchange();
                    },
                }),
            ]));
        }

        if (this.showInfoComment(line)) {
            fields.add('comment', m('.Form-group', [
                m('label', 'Comment'),
                m('textarea.FormControl', {
                    value: line.comment(),
                    onchange: event => {
                        line.pushAttributes({
                            comment: event.target.value,
                        });
                        onchange();
                    },
                }),
            ]));
        }

        return fields;
    }
}
