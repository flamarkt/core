import {Vnode} from 'mithril';
import app from 'flamarkt/backoffice/backoffice/app';
import Button from 'flarum/common/components/Button';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import User from 'flarum/common/models/User';
import ItemList from 'flarum/common/utils/ItemList';
import AbstractShowPage from 'flamarkt/backoffice/common/pages/AbstractShowPage';
import Order from '../../common/models/Order';
import OrderLine from '../../common/models/OrderLine';
import Sortable from 'flamarkt/backoffice/common/components/Sortable';
import OrderLineEdit from '../components/OrderLineEdit';
import SubmitButton from 'flamarkt/backoffice/backoffice/components/SubmitButton';
import UserRelationshipSelect from 'flamarkt/backoffice/common/components/UserRelationshipSelect';
import OrderLineEditState from '../states/OrderLineEditState';
import SoftDeleteButton from 'flamarkt/backoffice/backoffice/components/SoftDeleteButton';
import PermanentDeleteButton from 'flamarkt/backoffice/backoffice/components/PermanentDeleteButton';
import PaymentList from '../components/PaymentList';
import PaymentListPassthroughState from '../states/PaymentListPassthroughState';

export default class OrderShowPage extends AbstractShowPage {
    order: Order | null = null;
    user: User | null = null;
    lines: OrderLineEditState[] = [];
    saving: boolean = false;
    dirty: boolean = false;
    newLine!: OrderLineEditState;

    oninit(vnode: Vnode) {
        super.oninit(vnode);

        this.initNewLine();
    }

    initNewLine() {
        this.newLine = new OrderLineEditState();
    }

    initLineState(line: OrderLine): OrderLineEditState {
        const state = new OrderLineEditState();
        state.init(line);
        return state;
    }

    newRecord() {
        return app.store.createRecord('flamarkt-orders');
    }

    findType() {
        return 'flamarkt/orders';
    }

    show(order: Order) {
        this.order = order;
        this.user = order.user() || null;
        this.lines = (order.lines() as OrderLine[] || []).map(this.initLineState.bind(this));

        //app.setTitle(order.title());
        app.setTitleCount(0);
    }

    view() {
        if (!this.order) {
            return LoadingIndicator.component();
        }

        return m('form.OrderShowPage', {
            onsubmit: this.onsubmit.bind(this),
        }, m('.container.container--narrow', this.fields().toArray()));
    }

    fields(): ItemList<any> {
        const fields = new ItemList();

        fields.add('number', m('.Form-group', [
            m('label', app.translator.trans('flamarkt-core.backoffice.orders.field.number')),
            m('input.FormControl', {
                value: this.order!.number(),
                readonly: true,
            })
        ]), 30);

        fields.add('user', m('.Form-group', [
            m('label', app.translator.trans('flamarkt-core.backoffice.orders.field.user')),
            m(UserRelationshipSelect, {
                relationship: this.user,
                onchange: (user: User | null) => {
                    this.user = user;
                    this.dirty = true;
                },
                hasOne: true,
            }),
        ]), 20);

        fields.add('lines', m('table.OrderComposerTable', [
            m('thead', m('tr', this.tableHead().toArray())),
            m(Sortable, {
                containerTag: 'tbody',
                placeholderTag: 'tr',
                onsort: (origin, destination) => {
                    this.lines.splice(destination, 0, ...this.lines.splice(origin, 1));
                    this.dirty = true;
                },
            }, this.lines.map((line, index) => m(OrderLineEdit, {
                key: line.uniqueFormKey,
                line,
                sortable: true,
                control: Button.component({
                    icon: 'fas fa-times',
                    className: 'Button Button--icon Button--delete',
                    onclick: () => {
                        this.lines.splice(index, 1);
                        this.dirty = true;
                    },
                    title: app.translator.trans('flamarkt-core.backoffice.orders.lines.control.delete'),
                }),
                onchange: () => {
                    this.dirty = true;
                },
            }))),
            m('tbody', m(OrderLineEdit, {
                key: 'new',
                line: this.newLine,
                control: Button.component({
                    icon: 'fas fa-plus',
                    className: 'Button Button--icon',
                    onclick: () => {
                        //TODO: use onupdate on the edit line
                        this.lines.push(this.newLine);
                        this.dirty = true;

                        this.initNewLine();
                    },
                    title: app.translator.trans('flamarkt-core.backoffice.orders.lines.control.add'),
                }),
                onchange: () => {
                    this.dirty = true;
                },
            })),
        ]), 10);

        fields.add('submit', m('.Form-group', [
            SubmitButton.component({
                loading: this.saving,
                dirty: this.dirty,
                exists: this.order!.exists,
            }),
            ' ',
            SoftDeleteButton.component({
                model: this.order,
            }),
            ' ',
            PermanentDeleteButton.component({
                model: this.order,
                afterdelete() {
                    m.route.set(app.route('orders.index'));
                },
            }),
        ]), -10);

        fields.add('payments', m('.Form-group', [
            m('label', app.translator.trans('flamarkt-core.backoffice.payments.title')),
            m(PaymentList, {
                state: new PaymentListPassthroughState(this.order!),
            }),
        ]), -20);

        return fields;
    }

    tableHead() {
        const columns = new ItemList();

        columns.add('handle', m('th'), 100);
        columns.add('group', m('th', app.translator.trans('flamarkt-core.backoffice.orders.lines.head.group')), 90);
        columns.add('type', m('th', app.translator.trans('flamarkt-core.backoffice.orders.lines.head.type')), 80);
        columns.add('info', m('th', app.translator.trans('flamarkt-core.backoffice.orders.lines.head.info')), 30);
        columns.add('priceUnit', m('th', app.translator.trans('flamarkt-core.backoffice.orders.lines.head.priceUnit')), -30);
        columns.add('quantity', m('th', app.translator.trans('flamarkt-core.backoffice.orders.lines.head.quantity')), -60);
        columns.add('priceTotal', m('th', app.translator.trans('flamarkt-core.backoffice.orders.lines.head.priceTotal')), -90);
        columns.add('control', m('th'), -100);

        return columns;
    }

    data() {
        return {
            relationships: {
                lines: this.lines.map(line => {
                    return {
                        verbatim: true,
                        type: 'flamarkt-product-lines',
                        ...line.data(),
                    };
                }),
                user: this.user,
            },
        };
    }

    onsubmit(event: Event) {
        event.preventDefault();

        this.saving = true;

        this.saveThroughNewRecord<Order>(this.order?.id()!, this.data()).then(order => {
            this.order = order;

            this.saving = false;
            this.dirty = false;
            m.redraw();

            m.route.set(app.route.order(order));
        }).catch(error => {
            this.saving = false;
            m.redraw();
        });
    }
}
