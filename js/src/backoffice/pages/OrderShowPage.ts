import Button from 'flarum/common/components/Button';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import AbstractShowPage from '../../common/pages/AbstractShowPage';
import Order from '../../common/models/Order';
import OrderLine from '../../common/models/OrderLine';
import Sortable from '../../common/components/Sortable';
import OrderLineEdit from '../components/OrderLineEdit';
import SubmitButton from "../components/SubmitButton";

export default class OrderShowPage extends AbstractShowPage {
    order: Order | null = null;
    lines: OrderLine[] = [];
    saving: boolean = false;
    dirty: boolean = false;
    newLine!: OrderLine;

    oninit(vnode) {
        super.oninit(vnode);

        this.initNewLine();
    }

    initNewLine() {
        this.newLine = app.store.createRecord('flamarkt-order-lines', {
            id: Math.random(),
        });
    }

    newRecord() {
        return app.store.createRecord('flamarkt-orders');
    }

    findType() {
        return 'flamarkt/orders';
    }

    show(order: Order) {
        this.order = order;
        this.lines = order.lines() || [];

        //app.setTitle(order.title());
        app.setTitleCount(0);
    }

    view() {
        if (!this.order) {
            return LoadingIndicator.component();
        }

        return m('form.OrderShowPage', {
            onsubmit: this.onsubmit.bind(this),
        }, m('.container', [
            m('table', [
                m('thead', m('tr', [
                    m('th'),
                ])),
                m(Sortable, {
                    containerTag: 'tbody',
                    onsort: (origin, destination) => {
                        this.lines.splice(destination, 0, ...this.lines.splice(origin, 1));
                        this.dirty = true;
                    },
                }, this.lines.map((line, index) => m(OrderLineEdit, {
                    key: line.id(),
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
                        id: line.id(),
                        attributes: line.data.attributes,
                    };
                }),
            },
        };
    }

    onsubmit(event) {
        event.preventDefault();

        this.saving = true;

        // @ts-ignore
        this.order.save(this.data()).then(order => {
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
