import * as Mithril from 'mithril';
import AbstractShopLayout, {AbstractShopLayoutAttrs} from './AbstractShopLayout';
import Product from '../../common/models/Product';
import LinkButton from 'flarum/common/components/LinkButton';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import formatPrice from '../../common/helpers/formatPrice';
import ProductQuantity from '../components/ProductQuantity';
import ItemList from 'flarum/common/utils/ItemList';

export interface ProductShowLayoutAttrs extends AbstractShopLayoutAttrs {
    product?: Product,
}

export default class ProductShowLayout extends AbstractShopLayout<ProductShowLayoutAttrs> {
    breadcrumbItems() {
        const items = super.breadcrumbItems();

        items.add('products', LinkButton.component({
            href: app.route('flamarkt.products.index'),
        }, 'Products'));

        return items;
    }

    className() {
        return 'ProductShowPage';
    }

    title() {
        if (this.attrs.product) {
            return this.attrs.product.title() as string;
        }

        return '';
    }

    content() {
        return this.attrs.product ? this.loadedContent(this.attrs.product) : this.loadingContent();
    }

    loadingContent(): Mithril.Children {
        return LoadingIndicator.component({
            className: 'LoadingIndicator--block',
        });
    }

    loadedContent(product: Product): Mithril.Children {
        return m('.ProductShowSections', this.sections(product).toArray());
    }

    sections(product: Product): ItemList {
        const sections = new ItemList();

        const galleryItems = this.gallerySection(product).toArray();

        if (galleryItems.length) {
            sections.add('gallery', m('section.ProductShowSection.ProductShowSection--gallery', galleryItems));
        }

        sections.add('price', m('section.ProductShowSection.ProductShowSection--price', this.priceSection(product).toArray()));

        sections.add('description', m('section.ProductShowSection.ProductShowSection--description', this.descriptionSection(product).toArray()));

        return sections;
    }

    gallerySection(product: Product): ItemList {
        return new ItemList();
    }

    priceSection(product: Product): ItemList {
        const items = new ItemList();

        items.add('title', m('h1', product.title()));

        items.add('price', m('p', formatPrice(product.price())));

        items.add('quantity', ProductQuantity.component({
            product,
        }));

        return items;
    }

    descriptionSection(product: Product): ItemList {
        const items = new ItemList();

        const descriptionHtml = product.descriptionHtml();

        if (descriptionHtml) {
            items.add('description', m('div', m.trust(descriptionHtml)));
        }

        return items;
    }
}
