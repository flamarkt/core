import AbstractShopLayout, {AbstractShopLayoutAttrs} from './AbstractShopLayout';
import ProductListState from '../../common/states/ProductListState';
import ProductListItem from '../components/ProductListItem';
import ProductSortDropdown from '../../common/components/ProductSortDropdown';
import ItemList from 'flarum/common/utils/ItemList';

export interface ProductIndexLayoutAttrs extends AbstractShopLayoutAttrs {
    state: ProductListState,
}

export default class ProductIndexLayout<T = ProductIndexLayoutAttrs> extends AbstractShopLayout<T> {
    className() {
        return 'ProductIndexPage';
    }

    title() {
        return app.translator.trans('flamarkt-core.forum.products.headingTitle');
    }

    content() {
        return [
            m('.ProductListFilters', this.filters().toArray()),
            m('ul.ProductList', this.attrs.state.pages.map(page => page.items.map(product => ProductListItem.component({
                product,
            })))),
        ];
    }

    filters(): ItemList {
        const items = new ItemList();

        items.add('sort', m(ProductSortDropdown, {
            state: this.attrs.state,
            updateUrl: true,
        }));

        return items;
    }
}
