import Button from 'flarum/common/components/Button'
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import AbstractShowPage from '../../common/pages/AbstractShowPage';
import Product from '../../common/models/Product';

export default class ProductShowPage extends AbstractShowPage {
    product: Product | null = null;
    saving: boolean = false;
    title: string = '';
    description: string = '';
    price: string = '';

    newRecord() {
        return app.store.createRecord('flamarkt-products');
    }

    findType() {
        return 'flamarkt/products';
    }

    show(product: Product) {
        this.product = product;
        this.title = product.title() || '';
        this.description = product.description() || '';
        this.price = product.price() + '';

        //app.history.push('product', product.title());
        // @ts-ignore
        app.setTitle(product.title());
        app.setTitleCount(0);
    }

    view() {
        if (!this.product) {
            return LoadingIndicator.component();
        }

        return m('form.ProductShowPage', {
            onsubmit: this.onsubmit.bind(this),
        }, m('.container', [
            m('.Form-group', [
                m('label', 'Title'),
                m('input.FormControl', {
                    type: 'text',
                    value: this.title,
                    oninput: event => {
                        this.title = event.target.value;
                    },
                }),
            ]),
            m('.Form-group', [
                m('label', 'Description'),
                m('textarea.FormControl', {
                    value: this.description,
                    oninput: event => {
                        this.description = event.target.value;
                    },
                }),
            ]),
            m('.Form-group', [
                m('label', 'Price'),
                m('input.FormControl', {
                    type: 'number',
                    value: this.price,
                    oninput: event => {
                        this.price = event.target.value;
                    },
                }),
            ]),
            m('.Form-group', [
                Button.component({
                    type: 'submit',
                    className: 'Button Button--primary',
                    loading: this.saving,
                }, 'Save'),
            ]),
        ]));
    }

    data() {
        return {
            title: this.title,
            description: this.description,
            price: this.price,
        };
    }

    onsubmit(event) {
        event.preventDefault();

        this.saving = true;

        // @ts-ignore
        this.product.save(this.data()).then(product => {
            this.product = product;

            //TODO: route to new product

            this.saving = false;
            m.redraw();
        }).catch(error => {
            this.saving = false;
            m.redraw();
        });
    }
}
