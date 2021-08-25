import {extend, override} from 'flarum/common/extend';
import ExtensionPage from 'flarum/admin/components/ExtensionPage';
import BasicsPage from 'flarum/admin/components/BasicsPage';
import ItemList from 'flarum/common/utils/ItemList';

app.initializers.add('flamarkt-core', () => {
    override(ExtensionPage.prototype, 'content', function (this: ExtensionPage, original: any) {
        if (!this.extension.extra['flamarkt-backoffice'] || !this.extension.extra['flamarkt-backoffice'].settingsInBackoffice) {
            return original();
        }

        return m('.ExtensionPage-settings', m('.container', m('.Form-group', m('a.Button', {
            href: '/backoffice/extension/' + this.extension.id,
        }, app.translator.trans('flamarkt-core.admin.settingsInBackoffice')))));
    });

    extend(BasicsPage.prototype, 'homePageItems', function (items: ItemList) {
        items.add('flamarkt-products', {
            path: '/products',
            label: app.translator.trans('flamarkt-core.admin.homepage.products'),
        });
    });
});
