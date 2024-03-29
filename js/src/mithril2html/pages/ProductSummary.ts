import app from 'flarum/forum/app';
import {Vnode} from 'mithril';
import Page from 'flarum/common/components/Page';
import Product from '../../common/models/Product';
import LinkButton from 'flarum/common/components/LinkButton';
import ItemList from 'flarum/common/utils/ItemList';

export class ProductSummary extends Page {
    product: Product | null = null

    oninit(vnode: Vnode) {
        super.oninit(vnode);

        this.product = app.preloadedApiDocument<Product>();

        const id = m.route.param().id;

        // Only for testing
        if (id) {
            app.store.find<Product>('flamarkt/products', id).then(product => {
                this.product = product;
                m.redraw();
            });
        }
    }

    view() {
        if (!this.product) {
            return m('div', 'There was an error rendering the product');
        }

        return m('div', this.sections().toArray());
    }

    sections(): ItemList<any> {
        const sections = new ItemList();

        sections.add('title', m('h1', this.product!.title()), 100);

        sections.add('link', m('.ButtonBlock', LinkButton.component({
            className: 'Button',
            href: app.route.product(this.product),
        }, 'Product page')), -100); //TODO: translate

        return sections;
    }
}
