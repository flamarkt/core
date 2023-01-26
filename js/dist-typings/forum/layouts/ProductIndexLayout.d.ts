/// <reference types="flarum/@types/translator-icu-rich" />
import { Children } from 'mithril';
import ItemList from 'flarum/common/utils/ItemList';
import AbstractShopLayout, { AbstractShopLayoutAttrs } from './AbstractShopLayout';
import ProductListState from '../../common/states/ProductListState';
export interface ProductIndexLayoutAttrs extends AbstractShopLayoutAttrs {
    state: ProductListState;
}
export default class ProductIndexLayout<T extends ProductIndexLayoutAttrs = ProductIndexLayoutAttrs> extends AbstractShopLayout<T> {
    className(): string;
    title(): import("@askvortsov/rich-icu-message-formatter").NestedStringArray;
    currentPageHref(): string;
    contentTitle(): any;
    /**
     * Whether to show the "product disabled" information instead of the product list
     */
    showBrowsingDisabled(): boolean;
    content(): Children;
    bottomControls(): Children;
    filters(): ItemList<Children>;
}
