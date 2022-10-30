import app from 'flarum/forum/app';
import AbstractShopLayout, {AbstractShopLayoutAttrs} from './AbstractShopLayout';
import ProductListState from '../../common/states/ProductListState';
import ProductListItem from '../components/ProductListItem';
import ProductSortDropdown from '../../common/components/ProductSortDropdown';
import ItemList from 'flarum/common/utils/ItemList';
import Button from 'flarum/common/components/Button';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import Placeholder from 'flarum/common/components/Placeholder';

export interface ProductIndexLayoutAttrs extends AbstractShopLayoutAttrs {
    state: ProductListState,
}

export default class ProductIndexLayout<T extends ProductIndexLayoutAttrs = ProductIndexLayoutAttrs> extends AbstractShopLayout<T> {
    className() {
        return 'ProductIndexPage';
    }

    title() {
        if (this.currentPageHref() === '/') {
            return 'Home';
        }

        return app.translator.trans('flamarkt-core.forum.products.headingTitle');
    }

    currentPageHref(): string {
        return app.route('flamarkt.products.index');
    }

    contentTitle() {
        // If the product list is the homepage, it should be very redundant to show "Home" as the page title
        if (this.currentPageHref() === '/') {
            return null;
        }

        return super.contentTitle();
    }

    content() {
        return [
            m('.ProductListFilters', this.filters().toArray()),
            m('ul.ProductList', this.attrs.state.pages.map(page => page.items.map(product => ProductListItem.component({
                product,
            })))),
            this.bottomControls(),
        ];
    }

    bottomControls() {
        if (this.attrs.state.loading) {
            return LoadingIndicator.component();
        } else if (this.attrs.state.moreResults) {
            return Button.component({
                className: 'Button',
                onclick: this.attrs.state.loadMore.bind(this.attrs.state),
            }, 'Load more'); // TODO: translate
        }

        if (this.attrs.state.pages.length === 0 && !this.attrs.state.loading) {
            return Placeholder.component({
                text: 'No results', //TODO: translate
            });
        }
    }

    filters(): ItemList<any> {
        const items = new ItemList();

        items.add('sort', m(ProductSortDropdown, {
            list: this.attrs.state,
            updateUrl: true,
        }));

        return items;
    }
}
