import DecimalLabel, { DecimalLabelAttrs } from './DecimalLabel';
export interface PriceLabelAttrs extends DecimalLabelAttrs {
    hint?: string;
}
export default class PriceLabel<T extends PriceLabelAttrs = PriceLabelAttrs> extends DecimalLabel<T> {
    decimals(): number;
    view(): any[];
}
