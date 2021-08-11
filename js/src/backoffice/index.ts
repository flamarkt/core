import Select from 'flarum/common/components/Select';
import ExtensionPage from 'flarum/admin/components/ExtensionPage';
import Model from 'flarum/common/Model';
import BackofficeApplication from './BackofficeApplication';
import Order from '../common/models/Order';
import OrderLine from '../common/models/OrderLine';
import Product from '../common/models/Product';
import {common} from '../common/compat';
import {backoffice} from './compat';
import patchModelHasOneNull from '../common/patchModelHasOneNull';
import patchStoreAllowVerbatimRelationships from '../common/patchStoreAllowVerbatimRelationships';

// The original AdminApplication still gets created, but we override it here
// The boot method of the original will never be called
// @ts-ignore
const app = new BackofficeApplication();

// @ts-ignore
window.app = app;

export {
    app,
    common,
    backoffice,
};

// TODO: override in Flarum compat object?

app.initializers.add('flamarkt-core', () => {
    app.store.models['flamarkt-orders'] = Order;
    app.store.models['flamarkt-order-lines'] = OrderLine;
    app.store.models['flamarkt-products'] = Product;
    app.store.models.users.prototype.flamarktOrderCount = Model.attribute('flamarktOrderCount');

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
});

// On one hand these need to run as early as possible because they need to override Model.hasOne which is used in other extension's extenders
// But priority might need to be adjusted because it need to run as late as possible for the null catch to be the most outward override and therefore runs before other overrides
app.initializers.add('flamarkt-core-patch', () => {
    patchModelHasOneNull();
    patchStoreAllowVerbatimRelationships();
}, 100);
