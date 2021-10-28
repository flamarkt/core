import DefaultResolver from 'flarum/common/resolvers/DefaultResolver';
/**
 * Same as Flarum's own ExtensionPageResolver but we need to copy it because it's not exported
 */
export default class ExtensionPageResolver extends DefaultResolver {
    static extension: string | null;
    onmatch(args: any, requestedPath: any, route: any): any;
}
