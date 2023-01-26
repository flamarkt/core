import {Children} from 'mithril';
import app from 'flarum/forum/app';
import AbstractShopLayout, {AbstractShopLayoutAttrs} from './AbstractShopLayout';
import Product from '../../common/models/Product';
import LinkButton from 'flarum/common/components/LinkButton';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import ProductQuantity from '../components/ProductQuantity';
import ItemList from 'flarum/common/utils/ItemList';
import PriceLabel from '../../common/components/PriceLabel';
import BrowsingDisabled from '../components/BrowsingDisabled';

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

    /**
     * Whether to show the "browsing disabled" information message if the product cannot be loaded
     */
    showBrowsingDisabled(): boolean {
        return !app.forum.attribute('flamarktCanBrowse');
    }

    content() {
        const product = this.product();

        if (product) {
            return this.loadedContent(product);
        }

        // At the moment this won't be visible in many situations since the page will be handled by the basic HTTP 404 error when browsing directly
        // This will only be visible when following internal links
        if (this.showBrowsingDisabled()) {
            return m(BrowsingDisabled);
        }

        return this.loadingContent();
    }

    loadingContent(): Children {
        return LoadingIndicator.component({
            className: 'LoadingIndicator--block',
        });
    }

    loadedContent(product: Product): Children {
        return m('.ProductShowSections', m.fragment({
            key: product.id(), // Ensures a full redraw when the product changes in flamarkt/variants
        }, this.sections(product).toArray()));
    }

    sections(product: Product): ItemList<Children> {
        const sections = new ItemList<Children>();

        const galleryItems = this.gallerySection(product).toArray();

        if (galleryItems.length) {
            sections.add('gallery', m('section.ProductShowSection.ProductShowSection--gallery', galleryItems), 30);
        }

        sections.add('price', m('section.ProductShowSection.ProductShowSection--price', this.priceSection(product).toArray()), 20);

        sections.add('description', m('section.ProductShowSection.ProductShowSection--description', this.descriptionSection(product).toArray()), 10);

        return sections;
    }

    gallerySection(product: Product): ItemList<Children> {
        return new ItemList<Children>();
    }

    priceSection(product: Product): ItemList<Children> {
        const items = new ItemList<Children>();

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
        return !!product.canAddToCart();
    }

    descriptionSection(product: Product): ItemList<Children> {
        const items = new ItemList<Children>();

        const descriptionHtml = product.descriptionHtml();

        if (descriptionHtml) {
            items.add('description', m('div', m.trust(descriptionHtml)), 10);
        }

        return items;
    }
}
