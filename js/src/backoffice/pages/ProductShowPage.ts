import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import AbstractShowPage from '../../common/pages/AbstractShowPage';
import Product from '../../common/models/Product';
import SubmitButton from '../components/SubmitButton';
import ItemList from 'flarum/common/utils/ItemList';

export default class ProductShowPage extends AbstractShowPage {
    product: Product | null = null;
    saving: boolean = false;
    dirty: boolean = false;
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
        }, m('.container', this.fields().toArray()));
    }

    fields(): ItemList {
        const fields = new ItemList();

        fields.add('title', m('.Form-group', [
            m('label', app.translator.trans('flamarkt-core.backoffice.products.field.title')),
            m('input.FormControl', {
                type: 'text',
                value: this.title,
                oninput: event => {
                    this.title = event.target.value;
                    this.dirty = true;
                },
            }),
        ]));

        fields.add('description', m('.Form-group', [
            m('label', app.translator.trans('flamarkt-core.backoffice.products.field.description')),
            m('textarea.FormControl', {
                value: this.description,
                oninput: event => {
                    this.description = event.target.value;
                    this.dirty = true;
                },
            }),
        ]));

        fields.add('price', m('.Form-group', [
            m('label', app.translator.trans('flamarkt-core.backoffice.products.field.price')),
            m('input.FormControl', {
                type: 'number',
                value: this.price,
                oninput: event => {
                    this.price = event.target.value;
                },
            }),
        ]));

        fields.add('submit', m('.Form-group', [
            SubmitButton.component({
                loading: this.saving,
                dirty: this.dirty,
                exists: this.product.exists,
            }),
        ]), -10);

        return fields;
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

            this.saving = false;
            this.dirty = false;
            m.redraw();

            m.route.set(app.route.product(product));
        }).catch(error => {
            this.saving = false;
            m.redraw();
        });
    }
}
