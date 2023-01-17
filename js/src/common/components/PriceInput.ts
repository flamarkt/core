import app from 'flarum/common/app';
import DecimalInput from './DecimalInput';

export default class PriceInput extends DecimalInput {
    decimals(): number {
        return app.forum.attribute('priceDecimals');
    }

    className(): any[] {
        return ['FlamarktPriceInput', ...super.className()];
    }

    unitLabel(): string {
        return app.forum.attribute('priceUnit');
    }
}
