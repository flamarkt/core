/// <reference path="../../../../vendor/flarum/core/js/src/common/translator-icu-rich.d.ts" />
import AbstractShopLayout, { AbstractShopLayoutAttrs } from './AbstractShopLayout';
import ProductListState from '../../common/states/ProductListState';
import ItemList from 'flarum/common/utils/ItemList';
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
    content(): any[];
    bottomControls(): any;
    filters(): ItemList<any>;
}
