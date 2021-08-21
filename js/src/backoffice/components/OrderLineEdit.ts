import {Attributes, ClassComponent, Vnode} from 'mithril';
import SortableHandle from '../../common/components/SortableHandle';
import ItemList from 'flarum/common/utils/ItemList';
import Select from 'flarum/common/components/Select';
import ProductRelationshipSelect from './ProductRelationshipSelect';
import Product from '../../common/models/Product';
import OrderLineEditState from '../states/OrderLineEditState';
import PriceInput from '../../common/components/PriceInput';
import QuantityInput from '../../common/components/QuantityInput';
import PriceLabel from '../../common/components/PriceLabel';

interface OrderLineAttrs extends Attributes {
    line: OrderLineEditState
    sortable?: boolean
    control: Vnode
    onchange: () => void
}

export default class OrderLineEdit implements ClassComponent<OrderLineAttrs> {
    view(vnode: Vnode<OrderLineAttrs>) {
        const {line, control, onchange, sortable, style, ondragstart} = vnode.attrs;

        return m('tr', {
            // Copy over attrs from Sortable component
            style,
            'data-index': vnode.attrs['data-index'],
            ondragstart,
        }, this.columns(line, control, onchange, sortable).toArray());
    }

    columns(line: OrderLineEditState, control: Vnode, onchange: () => void, sortable?: boolean): ItemList {
        const columns = new ItemList();

        columns.add('handle', m('td.OrderLineEdit-Handle', sortable ? m(SortableHandle) : null), 100);
        columns.add('group', m('td.OrderLineEdit-Group', Select.component({
            value: line.group === null ? '_none' : line.group,
            onchange: (value: string) => {
                line.group = value === '_none' ? null : value;
                onchange();
            },
            options: {
                _none: 'None',
                shipping: 'Shipping',
            },
        })), 90);
        columns.add('type', m('td.OrderLineEdit-Type', Select.component({
            value: line.type,
            onchange: (value: string) => {
                line.type = value;
                onchange();
            },
            options: {
                product: 'Product',
                manual: 'Manual',
            },
        })), 80);
        columns.add('info', m('td.OrderLineEdit-Info', this.fields(line, onchange).toArray()), 30);
        columns.add('priceUnit', m('td.OrderLineEdit-PriceUnit', m(PriceInput, {
            value: line.priceUnit,
            onchange: (value: number) => {
                line.priceUnit = value;
                line.updateTotal();
                onchange();
            },
            product: line.product,
        })), -30);
        columns.add('quantity', m('td.OrderLineEdit-Quantity', m(QuantityInput, {
            value: line.quantity,
            onchange: (value: number) => {
                line.quantity = value;
                line.updateTotal();
                onchange();
            },
            product: line.product,
        })), -60);
        columns.add('priceTotal', m('td.OrderLineEdit-PriceTotal', m(PriceLabel, {
            value: line.priceTotal,
            product: line.product,
        })), -90);
        columns.add('control', m('td.OrderLineEdit-Controls', control), -100);

        return columns;
    }

    showInfoProduct(line: OrderLineEditState) {
        return line.type === 'product';
    }

    showInfoLabel(line: OrderLineEditState) {
        return line.type === 'manual';
    }

    showInfoComment(line: OrderLineEditState) {
        return line.type === 'product' || line.type === 'manual';
    }

    fields(line: OrderLineEditState, onchange: () => void): ItemList {
        const fields = new ItemList();

        if (this.showInfoProduct(line)) {
            fields.add('product', m('.Form-group', [
                m('label', 'Product'),
                m(ProductRelationshipSelect, {
                    relationship: line.product,
                    onchange: (product: Product | null) => {
                        line.product = product;
                        onchange();
                    },
                    hasOne: true,
                }),
            ]));
        }

        if (this.showInfoLabel(line)) {
            fields.add('label', m('.Form-group', [
                m('label', 'Label'),
                m('input.FormControl', {
                    type: 'text',
                    value: line.label,
                    onchange: (event: Event) => {
                        line.label = (event.target as HTMLInputElement).value;
                        onchange();
                    },
                }),
            ]));
        }

        if (this.showInfoComment(line)) {
            fields.add('comment', m('.Form-group', [
                m('label', 'Comment'),
                m('textarea.FormControl', {
                    value: line.comment,
                    onchange: (event: Event) => {
                        line.comment = (event.target as HTMLInputElement).value;
                        onchange();
                    },
                }),
            ]));
        }

        return fields;
    }
}
