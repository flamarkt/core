import {override} from 'flarum/common/extend';
import Model from 'flarum/common/Model';

export default function () {
    /**
     * The way Flarum parses relationships inside of the save() method prevents us from saving data alongside the relation
     * To work around this, we override this method that will allow us to pass down raw objects directly in the model during save
     * The same code is used in fof/taxonomies
     */
    override(Model, 'getIdentifier', function (original: (model: Model) => any, model: Model | any) {
        // Allow passing null relationships in save()
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
