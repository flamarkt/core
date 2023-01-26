import { Children } from 'mithril';
import AbstractShopLayout, { AbstractShopLayoutAttrs } from './AbstractShopLayout';
import Product from '../../common/models/Product';
import ItemList from 'flarum/common/utils/ItemList';
export interface ProductShowLayoutAttrs extends AbstractShopLayoutAttrs {
    product?: Product;
}
export default class ProductShowLayout extends AbstractShopLayout<ProductShowLayoutAttrs> {
    breadcrumbItems(): ItemList<any>;
    className(): string;
    /**
     * The actively displayed product, which can be different from this.attrs.product
     * This allows extensions like flamarkt/variants to change the displayed product without changing the page
     */
    product(): Product | undefined;
    title(): string;
    contentTitle(): null;
    /**
     * Whether to show the "browsing disabled" information message if the product cannot be loaded
     */
    showBrowsingDisabled(): boolean;
    content(): any;
    loadingContent(): Children;
    loadedContent(product: Product): Children;
    sections(product: Product): ItemList<Children>;
    gallerySection(product: Product): ItemList<Children>;
    priceSection(product: Product): ItemList<Children>;
    showCartControls(product: Product): boolean;
    descriptionSection(product: Product): ItemList<Children>;
}
