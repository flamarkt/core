import {Vnode} from 'mithril';
import Button from 'flarum/common/components/Button';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import User from 'flarum/common/models/User';
import AbstractShowPage from '../../common/pages/AbstractShowPage';
import Order from '../../common/models/Order';
import OrderLine from '../../common/models/OrderLine';
import Sortable from '../../common/components/Sortable';
import OrderLineEdit from '../components/OrderLineEdit';
import SubmitButton from '../components/SubmitButton';
import UserRelationshipSelect from '../components/UserRelationshipSelect';
import OrderLineEditState from '../states/OrderLineEditState';

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
        this.lines = (order.lines() || []).map(this.initLineState);

        //app.setTitle(order.title());
        app.setTitleCount(0);
    }

    view() {
        if (!this.order) {
            return LoadingIndicator.component();
        }

        return m('form.OrderShowPage', {
            onsubmit: this.onsubmit.bind(this),
        }, m('.container.container--narrow', [
            m('.Form-group', [
                m('label', 'Number'),
                m('input.FormControl', {
                    value: this.order.number(),
                    readonly: true,
                })
            ]),
            m('.Form-group', [
                m('label', 'Customer'),
                m(UserRelationshipSelect, {
                    relationship: this.user,
                    onchange: (user: User | null) => {
                        this.user = user;
                        this.dirty = true;
                    },
                    hasOne: true,
                }),
            ]),
            m('table.OrderComposerTable', [
                m('thead', m('tr', [
                    m('th'), // Sort
                    m('th', 'Group'),
                    m('th', 'Type'),
                    m('th', 'Info'),
                    m('th', 'Quantity'),
                    m('th', 'Unit Price'),
                    m('th', 'Total'),
                    m('th'), // Delete
                ])),
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
                    }),
                    onchange: () => {
                        this.dirty = true;
                    },
                })),
            ]),
            m('.Form-group', [
                SubmitButton.component({
                    loading: this.saving,
                    dirty: this.dirty,
                    exists: this.order.exists,
                }),
            ]),
        ]));
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

        this.saveThroughNewRecord<Order>(this.order?.id(), this.data()).then(order => {
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
