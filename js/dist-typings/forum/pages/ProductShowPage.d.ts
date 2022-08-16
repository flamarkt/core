import { Vnode } from 'mithril';
import AbstractShowPage from 'flamarkt/backoffice/common/pages/AbstractShowPage';
import Product from '../../common/models/Product';
export default class ProductShowPage extends AbstractShowPage {
    product: Product | null;
    oninit(vnode: Vnode): void;
    findType(): string;
    requestParams(): any;
    show(product: Product): void;
    view(): Mithril.Vnode;
}
