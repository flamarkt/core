import app from 'flamarkt/backoffice/backoffice/app';
import AbstractList from 'flamarkt/backoffice/backoffice/components/AbstractList';
import LinkButton from 'flarum/common/components/LinkButton';
import Product from '../../common/models/Product';

export default class ProductList extends AbstractList<Product> {
    head() {
        const columns = super.head();

        columns.add('title', m('th', app.translator.trans('flamarkt-core.backoffice.products.head.title')), 10);

        return columns;
    }

    columns(product: Product) {
        const columns = super.columns(product);

        columns.add('title', m('td', product.title()), 10);

        return columns;
    }

    actions(product: Product) {
        const actions = super.actions(product);

        actions.add('edit', LinkButton.component({
            className: 'Button Button--icon',
            icon: 'fas fa-pen',
            href: app.route.product(product),
        }));

        return actions;
    }
}
