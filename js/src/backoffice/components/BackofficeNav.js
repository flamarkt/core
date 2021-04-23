import AdminNav from 'flarum/admin/components/AdminNav';
import ItemList from 'flarum/common/utils/ItemList';
import LinkButton from 'flarum/common/components/LinkButton';
import ExtensionLinkButton from 'flarum/admin/components/ExtensionLinkButton';

export default class BackofficeNav extends AdminNav {
    oninit(vnode) {
        super.oninit(vnode);

        this.query = '';
    }

    items() {
        const items = new ItemList();

        items.add('category-core', m('h4.ExtensionListTitle', app.translator.trans('core.admin.nav.categories.core')), 80);

        items.add('dashboard', LinkButton.component({
            href: app.route('dashboard'),
            icon: 'far fa-chart-bar',
            title: app.translator.trans('core.admin.nav.dashboard_title'),
        }, app.translator.trans('core.admin.nav.dashboard_button')), 60);

        items.add('products', LinkButton.component({
            href: app.route('products.index'),
            icon: 'fas fa-box',
        }, 'Products'), 40);

        items.add('orders', LinkButton.component({
            href: app.route('orders.index'),
            icon: 'fas fa-shopping-cart',
        }, 'Orders'), 20);

        items.add('search', m('.Search-input', m('input.FormControl.SearchBar', {
            type: 'search',
            value: this.query,
            oninput: event => {
                this.query = event.target.value;
            },
            placeholder: app.translator.trans('core.admin.nav.search_placeholder')
        })), -10);

        return items;
    }

    getCategorizedExtensions() {
        let extensions = {};

        Object.keys(app.data.extensions).forEach((id) => {
            // TODO: use composer extra flag
            if (id.indexOf('flamarkt-') !== 0) {
                return;
            }

            const extension = app.data.extensions[id];

            let category = extension.extra['flarum-extension'].category;

            // Wrap languages packs into new system
            if (extension.extra['flarum-locale']) {
                category = 'language';
            }

            /*if (category in app.extensionCategories) {
                extensions[category] = extensions[category] || [];

                extensions[category].push(extension);
            } else {*/
            extensions.feature = extensions.feature || [];

            extensions.feature.push(extension);
            //}
        });

        return extensions;
    }

    extensionItems() {
        const items = new ItemList();

        const categorizedExtensions = this.getCategorizedExtensions();
        //const categories = app.extensionCategories;

        Object.keys(categorizedExtensions).map((category) => {
            if (!this.query) {
                items.add(
                    `category-${category}`,
                    <h4 className="ExtensionListTitle">{app.translator.trans(`core.admin.nav.categories.${category}`)}</h4>,
                    /*categories[category]*/
                );
            }

            categorizedExtensions[category].map((extension) => {
                const query = this.query.toUpperCase();
                const title = extension.extra['flarum-extension'].title;

                if (!query || title.toUpperCase().includes(query) || extension.description.toUpperCase().includes(query)) {
                    items.add(
                        `extension-${extension.id}`,
                        <ExtensionLinkButton
                            href={app.route('extension', {id: extension.id})}
                            extensionId={extension.id}
                            className="ExtensionNavButton"
                            title={extension.description}
                        >
                            {title}
                        </ExtensionLinkButton>,
                        /*categories[category]*/
                    );
                }
            });
        });

        return items;
    }
}
