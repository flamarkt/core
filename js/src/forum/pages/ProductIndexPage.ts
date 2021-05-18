import Page from 'flarum/common/components/Page';
import ProductListState from '../../common/states/ProductListState';
import ProductIndexLayout from '../layouts/ProductIndexLayout';

export default class ProductIndexPage extends Page {
    state!: ProductListState;

    oninit(vnode) {
        super.oninit(vnode);

        this.state = new ProductListState();
        this.state.refresh();
    }

    view() {
        return ProductIndexLayout.component({
            state: this.state,
        });
    }
}
