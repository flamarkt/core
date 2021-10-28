import { Children } from 'mithril';
import Component, { ComponentAttrs } from 'flarum/common/Component';
import Product from '../models/Product';
export interface DecimalLabelAttrs extends ComponentAttrs {
    value: number;
    product?: Product;
    unit?: string;
    decimals?: number;
}
export default class DecimalLabel<T extends DecimalLabelAttrs = DecimalLabelAttrs> extends Component<T> {
    decimals(): number;
    fromIntegerValue(value: number): number;
    view(): Children;
}
