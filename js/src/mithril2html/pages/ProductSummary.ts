import {Vnode} from 'mithril';
import Page from 'flarum/common/components/Page';
import Product from '../../common/models/Product';
import LinkButton from 'flarum/common/components/LinkButton';
import ItemList from 'flarum/common/utils/ItemList';

export class ProductSummary extends Page {
    product!: Product

    oninit(vnode: Vnode) {
        super.oninit(vnode);

        this.product = app.preloadedApiDocument() as Product;
    }

    view() {
        return m('div', this.sections().toArray());
    }

    sections(): ItemList {
        const sections = new ItemList();

        sections.add('title', m('h1', this.product.title()), 100);

        sections.add('link', m('div', LinkButton.component({
            href: app.route.product(this.product),
        }, 'Product page')), -100); //TODO: translate

        return sections;
    }
}
