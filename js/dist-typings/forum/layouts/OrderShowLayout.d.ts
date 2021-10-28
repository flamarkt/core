import AbstractAccountLayout, { AbstractAccountLayoutAttrs } from './AbstractAccountLayout';
import Order from '../../common/models/Order';
import ItemList from 'flarum/common/utils/ItemList';
export interface OrderShowLayoutAttrs extends AbstractAccountLayoutAttrs {
    order?: Order;
}
export default class OrderShowLayout extends AbstractAccountLayout<OrderShowLayoutAttrs> {
    className(): string;
    title(): any;
    content(): any;
    sections(): ItemList;
}
