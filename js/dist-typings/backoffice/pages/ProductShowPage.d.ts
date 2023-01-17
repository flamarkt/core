import AbstractShowPage from 'flamarkt/backoffice/common/pages/AbstractShowPage';
import Product from '../../common/models/Product';
import ItemList from 'flarum/common/utils/ItemList';
export default class ProductShowPage extends AbstractShowPage {
    product: Product | null;
    saving: boolean;
    dirty: boolean;
    title: string;
    description: string;
    price: number;
    availabilityDriver: string | null;
    priceDriver: string | null;
    newRecord(): import("flarum/common/Model").default;
    findType(): string;
    show(product: Product): void;
    view(): any;
    fields(): ItemList<any>;
    availabilityDriverOptions(): any;
    priceDriverOptions(): any;
    data(): {
        title: string;
        description: string;
        price: number;
        availabilityDriver: string | null;
        priceDriver: string | null;
    };
    onsubmit(event: Event): void;
}
