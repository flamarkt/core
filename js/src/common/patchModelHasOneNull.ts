import {override} from 'flarum/common/extend';
import Model from 'flarum/common/Model';

/**
 * Fixes inability to use null hasOne relationships with Flarum javascript models
 * @see https://github.com/flarum/core/issues/2876
 */
export default function () {
    // Allow passing null relationships in Model.prototype.save()
    override(Model, 'getIdentifier', function (original: (model: Model) => any, model: Model | any) {
        if (!model) {
            return null;
        }

        return original(model);
    });

    // Don't error if the data property exists on the relationship but is null
    // null is allowed as per https://jsonapi.org/format/#document-resource-object-linkage
    override(Model, 'hasOne', function (original: (name: string) => (() => any), name: string) {
        return function (this: Model) {
            if (this.data.relationships) {
                const relationship = this.data.relationships[name];

                if (relationship && !relationship.data) {
                    // Flarum might use false here. The code only looks for falsy for now anyway
                    return null;
                }
            }

            return original(name).call(this);
        };
    });
}
