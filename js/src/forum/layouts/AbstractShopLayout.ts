import {Children, Vnode} from 'mithril';
import Component, {ComponentAttrs} from 'flarum/common/Component';
import IndexPage from 'flarum/forum/components/IndexPage';
import ItemList from 'flarum/common/utils/ItemList';
import listItems from 'flarum/common/helpers/listItems';
import LinkButton from 'flarum/common/components/LinkButton';
import Breadcrumb from '../components/Breadcrumb';

export interface AbstractShopLayoutAttrs extends ComponentAttrs {
    // nothing special, but that way it can be extended
}

export default abstract class AbstractShopLayout<T = AbstractShopLayoutAttrs> extends Component<T> {
    // Workaround for Flarum not type-hinting it
    attrs!: T

    view(vnode: Vnode) {
        const className = this.className();

        return m('.ShopPage', {
            className: className || undefined,
        }, [
            IndexPage.prototype.hero(),
            m('.container', m('.sideNavContainer', [
                m('nav.IndexPage-nav.ShopPage-nav.sideNav', m('ul', listItems(this.sidebarItems().toArray()))),
                m('.ShopPage-content.sideNavOffset', [
                    Breadcrumb.component({
                        items: this.breadcrumbItems(),
                    }),
                    this.contentTitle(),
                    this.content(vnode),
                ]),
            ])),
        ]);
    }

    sidebarItems(): ItemList {
        return IndexPage.prototype.sidebarItems();
    }

    breadcrumbItems(): ItemList {
        const items = new ItemList();

        if (this.currentPageHref() !== '/') {
            items.add('home', LinkButton.component({
                href: '/',
            }, 'Home'), 100);
        }

        const title = this.title();

        if (title) {
            items.add('current', m('span.breadcrumb-current', title), -100);
        }

        return items;
    }

    className(): string {
        return '';
    }

    /**
     * Used as the breadcrumb current item as well as the <h1> title of the content
     * The title of the browser page needs to be set in the page itself and not the layout
     */
    title(): string {
        return '';
    }

    /**
     * Used as a hint for the breadcrumb to not repeat an existing item if it happens to be the same as the active page
     */
    currentPageHref(): string | null {
        return null;
    }

    contentTitle() {
        const title = this.title();

        if (title) {
            return m('h1', title);
        }

        return null;
    }

    abstract content(vnode: Vnode): Children
}
