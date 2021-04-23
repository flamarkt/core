import Button from 'flarum/common/components/Button';
import LinkButton from 'flarum/common/components/LinkButton';
import AbstractList from './AbstractList';
import Product from '../../common/models/Product';

export default class ProductList extends AbstractList {
    head() {
        const columns = super.head();

        columns.add('title', m('th', 'Title'));//TODO

        return columns;
    }

    columns(product: Product) {
        const columns = super.columns(product);

        columns.add('title', m('td', product.title()));

        return columns;
    }

    actions(product: Product) {
        const actions = super.actions(product);

        actions.add('edit', LinkButton.component({
            className: 'Button Button--icon',
            icon: 'fas fa-pen',
            href: app.route('products.show', {
                id: product.id(),
            }),
        }));

        actions.add('hide', Button.component({
            className: 'Button Button--icon',
            icon: 'fas fa-times',
        }));

        return actions;
    }
}
