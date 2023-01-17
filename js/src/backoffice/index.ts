import app from 'flamarkt/backoffice/backoffice/app';
import Model from 'flarum/common/Model';
import {common} from '../common/compat';
import {backoffice} from './compat';
import addModels from '../common/addModels';
import addNavLinks from './addNavLinks';
import addRoutes from './addRoutes';
import registerSettings from './registerSettings';

export {
    common,
    backoffice,
};

app.initializers.add('flamarkt-core', () => {
    addModels();

    // @ts-ignore no way to type-hint this at the moment
    app.store.models.users.prototype.flamarktOrderCount = Model.attribute('flamarktOrderCount');

    // Routes registration must be done before nav links
    addRoutes();
    addNavLinks();
    registerSettings();
});
