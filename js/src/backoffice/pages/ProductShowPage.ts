import app from 'flamarkt/backoffice/backoffice/app';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import AbstractShowPage from 'flamarkt/backoffice/common/pages/AbstractShowPage';
import Product from '../../common/models/Product';
import SubmitButton from 'flamarkt/backoffice/backoffice/components/SubmitButton';
import ItemList from 'flarum/common/utils/ItemList';
import Select from 'flarum/common/components/Select';
import SoftDeleteButton from 'flamarkt/backoffice/backoffice/components/SoftDeleteButton';
import PermanentDeleteButton from 'flamarkt/backoffice/backoffice/components/PermanentDeleteButton';
import RichTextInput from 'flamarkt/backoffice/backoffice/components/RichTextInput';
import PriceInput from '../../common/components/PriceInput';

export default class ProductShowPage extends AbstractShowPage {
    product: Product | null = null;
    saving: boolean = false;
    dirty: boolean = false;
    title: string = '';
    description: string = '';
    price: number = 0;
    availabilityDriver: string | null = null;
    priceDriver: string | null = null;

    newRecord() {
        return app.store.createRecord('flamarkt-products', {
            // Necessary because some extensions read values with model.attribute(name)
            // which errors if the attributes object is not defined
            attributes: {},
        });
    }

    findType() {
        return 'flamarkt/products';
    }

    show(product: Product) {
        this.product = product;
        this.title = product.title() || '';
        this.description = product.description() || '';
        this.price = product.priceEdit() || 0;
        this.availabilityDriver = product.attribute('availabilityDriver');
        this.priceDriver = product.attribute('priceDriver');

        //app.history.push('product', product.title());
        app.setTitle(product.title());
        app.setTitleCount(0);
    }

    view() {
        if (!this.product) {
            return LoadingIndicator.component();
        }

        return m('form.ProductShowPage', {
            onsubmit: this.onsubmit.bind(this),
        }, m('.container.container--narrow', this.fields().toArray()));
    }

    fields(): ItemList<any> {
        const fields = new ItemList();

        fields.add('title', m('.Form-group', [
            m('label', app.translator.trans('flamarkt-core.backoffice.products.field.title')),
            m('input.FormControl', {
                type: 'text',
                value: this.title,
                oninput: (event: Event) => {
                    this.title = (event.target as HTMLInputElement).value;
                    this.dirty = true;
                },
                disabled: this.saving,
            }),
        ]), 50);

        fields.add('description', m('.Form-group', [
            m('label', app.translator.trans('flamarkt-core.backoffice.products.field.description')),
            m(RichTextInput, {
                value: this.description,
                onchange: (value: string) => {
                    this.description = value;
                    this.dirty = true;

                    m.redraw();
                },
                disabled: this.saving,
            }),
        ]), 40);

        fields.add('price', m('.Form-group', [
            m('label', app.translator.trans('flamarkt-core.backoffice.products.field.price')),
            m(PriceInput, {
                value: this.price,
                onchange: (value: number) => {
                    this.price = value;
                    this.dirty = true;
                },
                disabled: this.saving,
            }),
        ]), 30);

        fields.add('availabilityDriver', m('.Form-group', [
            m('label', app.translator.trans('flamarkt-core.backoffice.products.field.availabilityDriver')),
            Select.component({
                value: this.availabilityDriver || '_default',
                options: this.availabilityDriverOptions(),
                onchange: (value: string) => {
                    this.availabilityDriver = value === '_default' ? null : value;
                    this.dirty = true;
                },
            }),
        ]), 20);

        fields.add('priceDriver', m('.Form-group', [
            m('label', app.translator.trans('flamarkt-core.backoffice.products.field.priceDriver')),
            Select.component({
                value: this.priceDriver || '_default',
                options: this.priceDriverOptions(),
                onchange: (value: string) => {
                    this.priceDriver = value === '_default' ? null : value;
                    this.dirty = true;
                },
            }),
        ]), 10);

        fields.add('submit', m('.Form-group', [
            SubmitButton.component({
                loading: this.saving,
                dirty: this.dirty,
                exists: this.product!.exists,
            }),
            ' ',
            SoftDeleteButton.component({
                model: this.product,
            }),
            ' ',
            PermanentDeleteButton.component({
                model: this.product,
                afterdelete() {
                    m.route.set(app.route('products.index'));
                },
            }),
        ]), -10);

        return fields;
    }

    availabilityDriverOptions(): any {
        const options: any = {
            _default: 'Default',
        };

        (app.forum.attribute('flamarktAvailabilityDrivers') as string[] || []).forEach(driver => {
            options[driver] = driver;
        });

        return options;
    }

    priceDriverOptions(): any {
        const options: any = {
            _default: 'Default',
        };

        (app.forum.attribute('flamarktPriceDrivers') as string[] || []).forEach(driver => {
            options[driver] = driver;
        });

        return options;
    }

    data() {
        return {
            title: this.title,
            description: this.description,
            price: this.price,
            availabilityDriver: this.availabilityDriver,
            priceDriver: this.priceDriver,
        };
    }

    onsubmit(event: Event) {
        event.preventDefault();

        this.saving = true;

        // We can't use product.save() because Flarum updates the internal data object before saving
        // Which interferes with the rendering of the Form that reads those values (including taxonomy fields and variants)
        this.saveThroughNewRecord<Product>(this.product?.id()!, this.data()).then(product => {
            this.product = product;

            this.saving = false;
            this.dirty = false;
            m.redraw();

            m.route.set(app.route.product(product));
        }).catch(error => {
            this.saving = false;
            m.redraw();

            throw error;
        });
    }
}
