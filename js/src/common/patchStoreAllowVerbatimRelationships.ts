import {override} from 'flarum/common/extend';
import Model from 'flarum/common/Model';

/**
 * The way Flarum parses relationships inside of the save() method prevents us from saving data alongside the relation
 * To work around this, we override this method that will allow us to pass down raw objects directly in the model during save
 * The same code is used in fof/taxonomies
 */
export default function () {
    override(Model, 'getIdentifier', function (original: (model: Model) => any, model: Model | any) {
        // This is fixed by patchModelHasOneNull but we need to handle it here as well depending on the load order
        if (!model) {
            return null;
        }

        if (model.verbatim) {
            delete model.verbatim;

            return model;
        }

        return original(model);
    });
}
