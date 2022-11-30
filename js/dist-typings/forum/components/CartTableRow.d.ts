import Component, { ComponentAttrs } from 'flarum/common/Component';
import ItemList from 'flarum/common/utils/ItemList';
import Product from '../../common/models/Product';
interface CartTableRowAttrs extends ComponentAttrs {
    product: Product;
}
export default class CartTableRow extends Component<CartTableRowAttrs> {
    quantity: number;
    quantitySaving: boolean;
    quantitySaveResult: 'success' | 'error' | null;
    quantityChangeDebounce: number;
    oninit(vnode: any): void;
    view(): any;
    columns(): ItemList<any>;
    quantityEditDisabled(): boolean;
    deleteDisabled(): boolean;
    deleteTooltipText(): string;
    submitQuantity(quantity: number): void;
}
export {};
