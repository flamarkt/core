import LinkButton from "flarum/common/components/LinkButton";

/**
 * A modified LinkButton that accepts a new activeRoutes attr that defines on which routes
 * the button should be rendered as active.
 * The attribute is an array of strings. The strings can optionally be terminated with *
 * to match all routes with the prefix.
 */
// @ts-ignore view method not type-hinted
export default class ActiveLinkButton extends LinkButton {
    static isActive(attrs) {
        return m.route.get() === attrs.href || ActiveLinkButton.activeRoutes(attrs).some(routeName => {
            const currentRouteName = (app.current.data as any).routeName;

            // In the admin panel, this is called before a first page sets routeName apparently
            if (!currentRouteName) {
                return false;
            }

            const matchAllIndex = routeName.indexOf('*');

            if (matchAllIndex !== -1) {
                // We always assume that * is at the end, and use everything up to that point as the string
                return currentRouteName.indexOf(routeName.substr(0, matchAllIndex)) === 0;
            }

            return currentRouteName === routeName;
        });
    }

    static activeRoutes(attrs): string[] {
        if (attrs.activeRoutes) {
            return attrs.activeRoutes;
        }

        return [];
    }
}
