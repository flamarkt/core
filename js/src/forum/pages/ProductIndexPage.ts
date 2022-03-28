import {Vnode} from 'mithril';
import app from 'flarum/forum/app';
import Page from 'flarum/common/components/Page';
import extractText from 'flarum/common/utils/extractText';
import ProductGridListState from '../states/ProductGridListState';
import ProductIndexLayout from '../layouts/ProductIndexLayout';

export default class ProductIndexPage extends Page {
    state!: ProductGridListState;

    oninit(vnode: Vnode) {
        super.oninit(vnode);

        this.state = this.initState();
        this.state.refresh();

        app.setTitle(extractText(app.translator.trans('flamarkt-core.forum.products.browserTitle')));
        app.setTitleCount(0);
    }

    initState() {
        const params = m.route.param();

        return new ProductGridListState({
            sort: params.sort,
            q: params.q,
        });
    }

    view() {
        return ProductIndexLayout.component({
            state: this.state,
        });
    }
}
