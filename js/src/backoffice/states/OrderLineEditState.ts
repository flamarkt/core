import OrderLine from '../../common/models/OrderLine';
import Product from '../../common/models/Product';
import Model from 'flarum/common/Model';

let uniqueKey = 0;

export default class OrderLineEditState {
    uniqueFormKey: string
    line?: OrderLine
    group: string | null = null
    type: string | null = null
    label: string = '';
    comment: string = '';
    quantity: number = 0
    priceUnit: number = 0
    priceTotal: number = 0
    product: Product | null = null

    constructor() {
        // Used as the Mithril key for re-order operations
        this.uniqueFormKey = ++uniqueKey + '';
    }

    init(line: OrderLine) {
        this.line = line;
        this.group = line.group() || null;
        this.type = line.type() || null;
        this.label = line.label() || '';
        this.comment = line.comment() || '';
        this.quantity = line.quantity() || 0;
        this.priceUnit = line.priceUnit() || 0;
        this.priceTotal = line.priceTotal() || 0;
        this.product = line.product() || null;
    }

    updateTotal() {
        this.priceTotal = this.quantity * this.priceUnit;
    }

    data(): any {
        const data: any = {
            attributes: {
                group: this.group,
                type: this.type,
                label: this.label,
                comment: this.comment,
                quantity: this.quantity,
                priceUnit: this.priceUnit,
                // priceTotal intentionally not sent, it's computed again server-side
            },
            relationships: {
                product: {
                    // @ts-ignore Model.getIdentifier is protected
                    data: Model.getIdentifier(this.product),
                },
            },
        };

        if (this.line) {
            data.id = this.line.id();
        }

        return data;
    }
}
