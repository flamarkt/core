import {Vnode} from 'mithril';
import AbstractShowPage from '../../common/pages/AbstractShowPage';
import Product from '../../common/models/Product';
import ProductShowLayout from '../layouts/ProductShowLayout';

export default class ProductShowPage extends AbstractShowPage {
    product: Product | null = null;

    oninit(vnode: Vnode) {
        //app.history.push('product');

        this.bodyClass = 'App--product';

        super.oninit(vnode);
    }

    findType() {
        return 'flamarkt/products';
    }

    show(product: Product) {
        this.product = product;

        //app.history.push('product', product.title());
        app.setTitle(product.title());
        app.setTitleCount(0);
    }

    view() {
        return ProductShowLayout.component({
            product: this.product,
        });
    }
}
