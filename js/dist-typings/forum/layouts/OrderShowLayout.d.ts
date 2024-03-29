/// <reference types="flarum/@types/translator-icu-rich" />
import AbstractAccountLayout, { AbstractAccountLayoutAttrs } from './AbstractAccountLayout';
import ItemList from 'flarum/common/utils/ItemList';
import Order from '../../common/models/Order';
export interface OrderShowLayoutAttrs extends AbstractAccountLayoutAttrs {
    order?: Order;
}
export default class OrderShowLayout extends AbstractAccountLayout<OrderShowLayoutAttrs> {
    className(): string;
    title(): import("@askvortsov/rich-icu-message-formatter").NestedStringArray;
    content(): any;
    sections(): ItemList<any>;
}
