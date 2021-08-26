import * as Mithril from 'mithril';
import AbstractShopLayout, {AbstractShopLayoutAttrs} from './AbstractShopLayout';
import Product from '../../common/models/Product';
import LinkButton from 'flarum/common/components/LinkButton';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import ProductQuantity from '../components/ProductQuantity';
import ItemList from 'flarum/common/utils/ItemList';
import PriceLabel from '../../common/components/PriceLabel';

export interface ProductShowLayoutAttrs extends AbstractShopLayoutAttrs {
    product?: Product,
}

export default class ProductShowLayout extends AbstractShopLayout<ProductShowLayoutAttrs> {
    breadcrumbItems() {
        const items = super.breadcrumbItems();

        items.add('products', LinkButton.component({
            href: app.route('flamarkt.products.index'),
        }, app.translator.trans('flamarkt-core.forum.breadcrumb.products')));

        return items;
    }

    className() {
        return 'ProductShowPage';
    }

    /**
     * The actively displayed product, which can be different from this.attrs.product
     * This allows extensions like flamarkt/variants to change the displayed product without changing the page
     */
    product(): Product | undefined {
        return this.attrs.product;
    }

    title() {
        const product = this.product();

        if (product) {
            return product.title() as string;
        }

        return '';
    }

    contentTitle() {
        // Don't show the title in its normal place, it's in the priceSection below instead
        return null;
    }

    content() {
        const product = this.product();

        return product ? this.loadedContent(product) : this.loadingContent();
    }

    loadingContent(): Mithril.Children {
        return LoadingIndicator.component({
            className: 'LoadingIndicator--block',
        });
    }

    loadedContent(product: Product): Mithril.Children {
        return m('.ProductShowSections', m.fragment({
            key: product.id(), // Ensures a full redraw when the product changes in flamarkt/variants
        }, this.sections(product).toArray()));
    }

    sections(product: Product): ItemList {
        const sections = new ItemList();

        const galleryItems = this.gallerySection(product).toArray();

        if (galleryItems.length) {
            sections.add('gallery', m('section.ProductShowSection.ProductShowSection--gallery', galleryItems), 30);
        }

        sections.add('price', m('section.ProductShowSection.ProductShowSection--price', this.priceSection(product).toArray()), 20);

        sections.add('description', m('section.ProductShowSection.ProductShowSection--description', this.descriptionSection(product).toArray()), 10);

        return sections;
    }

    gallerySection(product: Product): ItemList {
        return new ItemList();
    }

    priceSection(product: Product): ItemList {
        const items = new ItemList();

        if (product.canEdit()) {
            items.add('edit', LinkButton.component({
                className: 'Button',
                href: app.forum.attribute('backofficeUrl') + '/products/' + product.id(),
                external: true,
            }, 'Edit'), 200);
        }

        items.add('title', m('h1', product.title()), 100);

        items.add('price', m('p', m(PriceLabel, {
            value: product.price(),
            hint: 'product',
        })), 50);

        if (this.showCartControls(product)) {
            items.add('quantity', ProductQuantity.component({
                product,
            }), 20);
        }

        return items;
    }

    showCartControls(product: Product): boolean {
        return !!product.canOrder();
    }

    descriptionSection(product: Product): ItemList {
        const items = new ItemList();

        const descriptionHtml = product.descriptionHtml();

        if (descriptionHtml) {
            items.add('description', m('div', m.trust(descriptionHtml)), 10);
        }

        return items;
    }
}
