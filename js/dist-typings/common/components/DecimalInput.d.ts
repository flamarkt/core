import Component, { ComponentAttrs } from 'flarum/common/Component';
import Product from '../models/Product';
export interface DecimalInputAttrs extends ComponentAttrs {
    value: number;
    onchange: (value: number) => void;
    disabled?: boolean;
    product?: Product;
    unit?: string;
    min?: number;
    max?: number;
    step?: number;
    decimals?: number;
    className?: string;
}
export default class DecimalInput<T extends DecimalInputAttrs = DecimalInputAttrs> extends Component<T> {
    decimals(): number;
    min(): number | undefined;
    max(): number | undefined;
    step(): number | undefined;
    disabled(): boolean;
    className(): string;
    fromIntegerValue(value: number): number;
    toIntegerValue(value: number): number;
    inputAttrs(): any;
    view(): any;
}
