import Component, { ComponentAttrs } from 'flarum/common/Component';
import ItemList from 'flarum/common/utils/ItemList';
import Product from '../../common/models/Product';
import { InlineSubmitStatusResult } from './InlineSubmitStatus';
interface CartTableRowAttrs extends ComponentAttrs {
    product: Product;
}
export default class CartTableRow extends Component<CartTableRowAttrs> {
    quantity: number;
    savedQuantity: number;
    quantitySaving: boolean;
    quantitySaveResult: InlineSubmitStatusResult;
    quantityChangeDebounce: number;
    oninit(vnode: any): void;
    view(): any;
    columns(): ItemList<any>;
    inlineLoading(): boolean;
    inlineResult(): InlineSubmitStatusResult;
    quantityEditDisabled(): boolean;
    deleteDisabled(): boolean;
    deleteTooltipText(): string;
    submitQuantity(quantity: number): void;
    submitQuantityDone(product: Product): void;
    submitQuantityError(error: any): void;
}
export {};
