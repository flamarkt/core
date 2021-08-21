import DecimalLabel, {DecimalLabelAttrs} from './DecimalLabel';

export interface PriceLabelAttrs extends DecimalLabelAttrs {
    hint?: string // A text designed to help with extensibility
}

export default class PriceLabel<T extends PriceLabelAttrs = PriceLabelAttrs> extends DecimalLabel<T> {
    decimals(): number {
        return app.forum.attribute('priceDecimals');
    }

    view() {
        return [
            super.view(),
            ' ',
            app.forum.attribute('priceUnit'),
        ];
    }
}
