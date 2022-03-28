import {Children} from 'mithril';
import app from 'flarum/forum/app';
import Page from 'flarum/common/components/Page';
import IndexPage from 'flarum/forum/components/IndexPage';
import ItemList from 'flarum/common/utils/ItemList';
import listItems from 'flarum/common/helpers/listItems';
import LinkButton from 'flarum/common/components/LinkButton';
import Breadcrumb from '../components/Breadcrumb';

/**
 * @deprecated replaced by Layout
 */
export default abstract class AbstractShopPage extends Page {
    view() {
        return m('.ShopPage', [
            IndexPage.prototype.hero(),
            m('.container', m('.sideNavContainer', [
                m('nav.ShopPage-nav.sideNav', m('ul', listItems(this.sidebarItems().toArray()))),
                m('.ShopPage-content.sideNavOffset', [
                    Breadcrumb.component({
                        items: this.breadcrumbItems(),
                    }),
                    this.content(),
                ]),
            ])),
        ]);
    }

    sidebarItems(): ItemList<any> {
        return IndexPage.prototype.sidebarItems();
    }

    breadcrumbItems(): ItemList<any> {
        const items = new ItemList();

        items.add('home', LinkButton.component({
            href: app.route('index'),
        }, 'Home' as any), 100);

        return items;
    }

    abstract content(): Children
}
