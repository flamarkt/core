import * as Mithril from 'mithril';
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
    view() {
        const className = this.className();
        const title = this.title();

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
                    title ? m('h1', title) : null,
                    this.content(),
                ]),
            ])),
        ]);
    }

    sidebarItems(): ItemList {
        return IndexPage.prototype.sidebarItems();
    }

    breadcrumbItems(): ItemList {
        const items = new ItemList();

        items.add('home', LinkButton.component({
            href: app.route('index'),
        }, 'Home'), 100);

        const title = this.title();

        if (title) {
            items.add('current', m('span.breadcrumb-current', title), -100);
        }

        return items;
    }

    className(): string {
        return '';
    }

    title(): string {
        return '';
    }

    abstract content(): Mithril.Children
}
