/// <reference path="../../../../vendor/flarum/core/js/src/common/translator-icu-rich.d.ts" />
import AbstractShopLayout, { AbstractShopLayoutAttrs } from './AbstractShopLayout';
import Cart from '../../common/models/Cart';
import Order from '../../common/models/Order';
import ItemList from 'flarum/common/utils/ItemList';
export interface CartLayoutAttrs extends AbstractShopLayoutAttrs {
    cart?: Cart;
}
export default class CartLayout extends AbstractShopLayout<CartLayoutAttrs> {
    submitting: boolean;
    className(): string;
    title(): import("@askvortsov/rich-icu-message-formatter").NestedStringArray;
    content(): any;
    sectionProducts(): ItemList<any>;
    sectionPayment(): ItemList<any>;
    sections(): ItemList<any>;
    data(): {
        relationships: {
            cart: Cart | undefined;
        };
    };
    onsubmit(event: Event): void;
    afterSuccessfulSubmit(order: Order): void;
    afterFailedSubmit(error: any): void;
}
