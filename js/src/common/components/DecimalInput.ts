import Component, {ComponentAttrs} from 'flarum/common/Component';
import Product from '../models/Product';

export interface DecimalInputAttrs extends ComponentAttrs {
    value: number
    onchange: (value: number) => void
    disabled?: boolean
    product?: Product
    unit?: string
    min?: number
    max?: number
    step?: number
    decimals?: number
    className?: string
}

export default class DecimalInput<T extends DecimalInputAttrs = DecimalInputAttrs> extends Component<T> {
    decimals(): number {
        return this.attrs.decimals || 0;
    }

    min(): number | undefined {
        return this.attrs.min;
    }

    max(): number | undefined {
        return this.attrs.max;
    }

    step(): number | undefined {
        return this.attrs.step;
    }

    disabled(): boolean {
        return !!this.attrs.disabled;
    }

    className(): string {
        return this.attrs.className || '';
    }

    fromIntegerValue(value: number): number {
        return value / Math.pow(10, this.decimals());
    }

    toIntegerValue(value: number): number {
        return Math.round(value * Math.pow(10, this.decimals()));
    }

    inputAttrs() {
        const inputAttrs: any = {
            type: 'number',
            value: this.fromIntegerValue(this.attrs.value) + '', // Cast to string to preserve zero
            onchange: (event: Event) => {
                const value = parseFloat((event.target as HTMLInputElement).value);

                this.attrs.onchange(this.toIntegerValue(value));
            },
            disabled: this.disabled(),
        };

        const min = this.min();

        if (typeof min !== 'undefined') {
            inputAttrs.min = this.fromIntegerValue(min);
        }

        const max = this.max();

        if (typeof max !== 'undefined') {
            inputAttrs.max = this.fromIntegerValue(max);
        }

        const step = this.step();

        if (typeof step !== 'undefined') {
            inputAttrs.step = this.fromIntegerValue(step);
        } else if (this.decimals() > 0) {
            inputAttrs.step = 1 / Math.pow(10, this.decimals());
        }

        const className = this.className();

        if (className) {
            inputAttrs.className = className;
        }

        return inputAttrs;
    }

    view() {
        return m('input.FormControl', this.inputAttrs());
    }
}
