import {Children} from 'mithril';
import app from 'flarum/forum/app';
import Button from 'flarum/common/components/Button';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import Placeholder from 'flarum/common/components/Placeholder';
import ItemList from 'flarum/common/utils/ItemList';
import AbstractShopLayout, {AbstractShopLayoutAttrs} from './AbstractShopLayout';
import ProductListItem from '../components/ProductListItem';
import ProductSortDropdown from '../../common/components/ProductSortDropdown';
import ProductListState from '../../common/states/ProductListState';
import BrowsingDisabled from '../components/BrowsingDisabled';

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

    /**
     * Whether to show the "product disabled" information instead of the product list
     */
    showBrowsingDisabled(): boolean {
        return !app.forum.attribute('flamarktCanBrowse');
    }

    content(): Children {
        if (this.showBrowsingDisabled()) {
            // Use an array to prevent everything from breaking if an extension extends content as an array
            return [
                m(BrowsingDisabled),
            ];
        }

        return [
            m('.ProductListFilters', this.filters().toArray()),
            m('ul.ProductList', this.attrs.state.pages.map(page => page.items.map(product => ProductListItem.component({
                product,
            })))),
            this.bottomControls(),
        ];
    }

    bottomControls(): Children {
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

        return null;
    }

    filters(): ItemList<Children> {
        const items = new ItemList<Children>();

        items.add('sort', m(ProductSortDropdown, {
            list: this.attrs.state,
            updateUrl: true,
        }));

        return items;
    }
}
