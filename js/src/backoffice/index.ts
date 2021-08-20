import Model from 'flarum/common/Model';
import BackofficeApplication from './BackofficeApplication';
import Order from '../common/models/Order';
import OrderLine from '../common/models/OrderLine';
import Product from '../common/models/Product';
import {common} from '../common/compat';
import {backoffice} from './compat';
import patchModelHasOneNull from '../common/patchModelHasOneNull';
import patchStoreAllowVerbatimRelationships from '../common/patchStoreAllowVerbatimRelationships';
import registerSettings from './registerSettings';
import hideSettingsAndPermissionsIfNotAdmin from './hideSettingsAndPermissionsIfNotAdmin';

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

    registerSettings();
    hideSettingsAndPermissionsIfNotAdmin();
});

// On one hand these need to run as early as possible because they need to override Model.hasOne which is used in other extension's extenders
// But priority might need to be adjusted because it need to run as late as possible for the null catch to be the most outward override and therefore runs before other overrides
app.initializers.add('flamarkt-core-patch', () => {
    patchModelHasOneNull();
    patchStoreAllowVerbatimRelationships();
}, 100);
