/// <reference types="mithril" />
import AbstractShopLayout, { AbstractShopLayoutAttrs } from './AbstractShopLayout';
import ProductListState from '../../common/states/ProductListState';
import ItemList from 'flarum/common/utils/ItemList';
export interface ProductIndexLayoutAttrs extends AbstractShopLayoutAttrs {
    state: ProductListState;
}
export default class ProductIndexLayout<T extends ProductIndexLayoutAttrs = ProductIndexLayoutAttrs> extends AbstractShopLayout<T> {
    className(): string;
    title(): any;
    currentPageHref(): string;
    contentTitle(): import("mithril").Vnode<any, any> | null;
    content(): any[];
    bottomControls(): any;
    filters(): ItemList;
}
