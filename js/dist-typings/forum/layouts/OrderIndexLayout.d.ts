/// <reference types="flarum/@types/translator-icu-rich" />
import { Children } from 'mithril';
import ItemList from 'flarum/common/utils/ItemList';
import AbstractAccountLayout, { AbstractAccountLayoutAttrs } from './AbstractAccountLayout';
import OrderListState from '../../common/states/OrderListState';
import Order from '../../common/models/Order';
export interface OrderIndexLayoutAttrs extends AbstractAccountLayoutAttrs {
    state: OrderListState;
}
export default class OrderIndexLayout extends AbstractAccountLayout<OrderIndexLayoutAttrs> {
    className(): string;
    title(): import("@askvortsov/rich-icu-message-formatter").NestedStringArray;
    content(): Children;
    headerRow(): ItemList<Children>;
    orderRow(order: Order): ItemList<Children>;
    bottomRowContent(): Children;
    bottomRow(): Children;
}
