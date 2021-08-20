import {override} from 'flarum/common/extend';
import ExtensionPage from 'flarum/admin/components/ExtensionPage';

export default function () {
    override(ExtensionPage.prototype, 'content', function (this: ExtensionPage, original: any) {
        // If the user has admin access, show as normal
        if (app.forum.attribute('adminUrl')) {
            return original();
        }

        const settings = app.extensionData.getSettings(this.extension.id);

        // If there are no settings, show as normal
        if (!settings) {
            return original();
        }

        // Show a special message so the user isn't confused why they don't see or can't edit the values
        return m('.ExtensionPage-settings', m('.container', m('h3.ExtensionPage-subHeader', app.translator.trans('flamarkt-core.backoffice.settingsNotAvailableForNonAdmin'))));
    });
}
