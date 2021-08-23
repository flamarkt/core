import {Vnode} from 'mithril';
import Page from 'flarum/common/components/Page';
import ProductListState from '../../common/states/ProductListState';
import ProductIndexLayout from '../layouts/ProductIndexLayout';

export default class ProductIndexPage extends Page {
    state!: ProductListState;

    oninit(vnode: Vnode) {
        super.oninit(vnode);

        this.state = this.initState();
        this.state.refresh();

        app.setTitle(app.translator.trans('flamarkt-core.forum.products.browserTitle'));
        app.setTitleCount(0);
    }

    initState() {
        const params = m.route.param();

        return new ProductListState({
            sort: params.sort,
        });
    }

    view() {
        return ProductIndexLayout.component({
            state: this.state,
        });
    }
}
