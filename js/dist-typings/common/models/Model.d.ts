import OriginalModel from 'flarum/common/Model';
/**
 * A class to apply the correct typings to the static method since there's no other way
 * @see https://github.com/microsoft/TypeScript/issues/36146
 */
export default class Model extends OriginalModel {
    static attribute<T = any>(name: string, transform?: Function): (value?: string) => T | undefined;
    static hasOne<T extends OriginalModel = OriginalModel>(name: string): () => T | false | undefined;
    static hasMany<T extends OriginalModel = OriginalModel>(name: string): () => T[] | false;
}
