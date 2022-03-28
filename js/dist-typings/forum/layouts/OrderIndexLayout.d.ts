/// <reference path="../../../../vendor/flarum/core/js/src/common/translator-icu-rich.d.ts" />
import AbstractAccountLayout, { AbstractAccountLayoutAttrs } from './AbstractAccountLayout';
import OrderListState from '../../common/states/OrderListState';
import Order from '../../common/models/Order';
import ItemList from 'flarum/common/utils/ItemList';
export interface OrderIndexLayoutAttrs extends AbstractAccountLayoutAttrs {
    state: OrderListState;
}
export default class OrderIndexLayout extends AbstractAccountLayout<OrderIndexLayoutAttrs> {
    className(): string;
    title(): import("@askvortsov/rich-icu-message-formatter").NestedStringArray;
    content(): any;
    headerRow(): ItemList<any>;
    orderRow(order: Order): ItemList<any>;
    bottomRowContent(): any;
    bottomRow(): any;
}
