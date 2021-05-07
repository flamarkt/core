import {override} from 'flarum/common/extend';
import ExtensionPage from 'flarum/admin/components/ExtensionPage';

app.initializers.add('flamarkt-core', () => {
    override(ExtensionPage.prototype, 'content', function (this: ExtensionPage, original) {
        if (!this.extension.extra['flamarkt-backoffice'] || !this.extension.extra['flamarkt-backoffice'].settingsInBackoffice) {
            return original();
        }

        return m('.ExtensionPage-settings', m('.container', m('.Form-group', m('a.Button', {
            href: '/backoffice/extension/' + this.extension.id,
        }, app.translator.trans('flamarkt-core.admin.settingsInBackoffice')))));
    });
});
