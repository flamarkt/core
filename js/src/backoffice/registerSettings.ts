import ExtensionPage from 'flarum/admin/components/ExtensionPage';
import Select from 'flarum/common/components/Select';

export default function () {
    app.extensionData.for('flamarkt-core')
        .registerSetting(function (this: ExtensionPage) {
            const options: any = {};

            (app.forum.attribute('flamarktAvailabilityDrivers') as string[] || []).forEach(driver => {
                options[driver] = driver;
            });

            return m('.Form-group', [
                m('label', app.translator.trans('flamarkt-core.backoffice.settings.defaultAvailabilityDriver')),
                Select.component({
                    value: this.setting('flamarkt.defaultAvailabilityDriver')() || 'never',
                    options,
                    onchange: this.setting('flamarkt.defaultAvailabilityDriver'),
                }),
            ]);
        })
        .registerSetting(function (this: ExtensionPage) {
            const options: any = {};

            (app.forum.attribute('flamarktPriceDrivers') as string[] || []).forEach(driver => {
                options[driver] = driver;
            });

            return m('.Form-group', [
                m('label', app.translator.trans('flamarkt-core.backoffice.settings.defaultPriceDriver')),
                Select.component({
                    value: this.setting('flamarkt.defaultPriceDriver')() || 'fixed',
                    options,
                    onchange: this.setting('flamarkt.defaultPriceDriver'),
                }),
            ]);
        })
        .registerSetting({
            type: 'switch',
            setting: 'flamarkt.forceOrderPrepayment',
            label: app.translator.trans('flamarkt-core.backoffice.settings.forceOrderPrepayment'),
        })
        .registerPermission({
            icon: 'fas fa-shopping-cart',
            label: app.translator.trans('flamarkt-core.backoffice.permissions.shop'),
            permission: 'flamarkt.shop',
            allowGuest: true,
        }, 'reply')
        .registerPermission({
            icon: 'fas fa-wrench',
            label: app.translator.trans('flamarkt-core.backoffice.permissions.backoffice'),
            permission: 'backoffice', // Intentionally not namespaced
        }, 'moderate');
}
