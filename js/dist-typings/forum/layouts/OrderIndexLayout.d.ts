/// <reference types="mithril" />
import AbstractAccountLayout, { AbstractAccountLayoutAttrs } from './AbstractAccountLayout';
import OrderListState from '../../common/states/OrderListState';
import Order from '../../common/models/Order';
import ItemList from 'flarum/common/utils/ItemList';
export interface OrderIndexLayoutAttrs extends AbstractAccountLayoutAttrs {
    state: OrderListState;
}
export default class OrderIndexLayout extends AbstractAccountLayout<OrderIndexLayoutAttrs> {
    className(): string;
    title(): any;
    content(): import("mithril").Vnode<any, any>;
    headerRow(): ItemList;
    orderRow(order: Order): ItemList;
    bottomRowContent(): any;
    bottomRow(): import("mithril").Vnode<any, any> | null;
}
