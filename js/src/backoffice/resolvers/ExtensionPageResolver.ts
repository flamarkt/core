import DefaultResolver from 'flarum/common/resolvers/DefaultResolver';

/**
 * Same as Flarum's own ExtensionPageResolver but we need to copy it because it's not exported
 */
export default class ExtensionPageResolver extends DefaultResolver {
    static extension: string | null = null;

    onmatch(args, requestedPath, route) {
        const extensionPage = app.extensionData.getPage(args.id);

        if (extensionPage) {
            return extensionPage;
        }

        return super.onmatch(args, requestedPath, route);
    }
}
