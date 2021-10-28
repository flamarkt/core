import * as Mithril from 'mithril';
import AbstractShopLayout, { AbstractShopLayoutAttrs } from './AbstractShopLayout';
import Product from '../../common/models/Product';
import ItemList from 'flarum/common/utils/ItemList';
export interface ProductShowLayoutAttrs extends AbstractShopLayoutAttrs {
    product?: Product;
}
export default class ProductShowLayout extends AbstractShopLayout<ProductShowLayoutAttrs> {
    breadcrumbItems(): ItemList;
    className(): string;
    /**
     * The actively displayed product, which can be different from this.attrs.product
     * This allows extensions like flamarkt/variants to change the displayed product without changing the page
     */
    product(): Product | undefined;
    title(): string;
    contentTitle(): null;
    content(): Mithril.Children;
    loadingContent(): Mithril.Children;
    loadedContent(product: Product): Mithril.Children;
    sections(product: Product): ItemList;
    gallerySection(product: Product): ItemList;
    priceSection(product: Product): ItemList;
    showCartControls(product: Product): boolean;
    descriptionSection(product: Product): ItemList;
}
