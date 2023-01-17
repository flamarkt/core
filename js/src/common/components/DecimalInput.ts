import Component, {ComponentAttrs} from 'flarum/common/Component';
import classList from 'flarum/common/utils/classList';
import Product from '../models/Product';

export interface DecimalInputAttrs extends ComponentAttrs {
    value: number
    onchange: (value: number) => void
    disabled?: boolean
    readonly?: boolean
    product?: Product
    unit?: string
    min?: number
    max?: number
    step?: number
    decimals?: number
    className?: string
}

export default class DecimalInput<T extends DecimalInputAttrs = DecimalInputAttrs> extends Component<T> {
    hasFocus: boolean = false

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

    readonly(): boolean {
        return !!this.attrs.readonly;
    }

    className(): any[] {
        return [{
            focused: this.hasFocus,
        }, this.attrs.className];
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
            onfocus: () => {
                this.hasFocus = true;
            },
            onblur: () => {
                this.hasFocus = false;
            },
            disabled: this.disabled(),
            readonly: this.readonly(),
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

        return inputAttrs;
    }

    unitLabel(): string {
        return '';
    }

    view() {
        const label = this.unitLabel();

        return m('.FlamarktDecimalInput.FormControl', {
            className: classList(this.className()),
        }, [
            m('input', this.inputAttrs()),
            label ? m('.FlamarktDecimalInputUnit', {
                onclick: () => {
                    this.$('input').focus();
                },
            }, label) : null,
        ]);
    }
}
