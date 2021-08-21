import DecimalInput from './DecimalInput';

export default class PriceInput extends DecimalInput {
    decimals(): number {
        return app.forum.attribute('priceDecimals');
    }
}
