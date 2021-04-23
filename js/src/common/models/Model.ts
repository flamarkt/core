import OriginalModel from 'flarum/common/Model';

/**
 * A class to apply the correct typings to the static method since there's no other way
 * @see https://github.com/microsoft/TypeScript/issues/36146
 */
// @ts-ignore
export default class Model extends OriginalModel {
    static attribute<T = any>(name: string, transform?: Function): (value?: string) => T | undefined {
        return OriginalModel.attribute(name, transform);
    }

    static hasOne<T extends OriginalModel = OriginalModel>(name: string): () => T | false | undefined {
        return OriginalModel.hasOne(name) as any;
    }

    static hasMany<T extends OriginalModel = OriginalModel>(name: string): () => T[] | false {
        return OriginalModel.hasMany(name);
    }
}
