import { ComponentAttrs } from 'flarum/common/Component';
import LinkButton from 'flarum/common/components/LinkButton';
interface ActiveLinkButtonAttrs extends ComponentAttrs {
    href: string;
    activeRoutes?: string[];
}
/**
 * A modified LinkButton that accepts a new activeRoutes attr that defines on which routes
 * the button should be rendered as active.
 * The attribute is an array of strings. The strings can optionally be terminated with *
 * to match all routes with the prefix.
 */
export default class ActiveLinkButton extends LinkButton {
    static isActive(attrs: ActiveLinkButtonAttrs): boolean;
    static activeRoutes(attrs: ActiveLinkButtonAttrs): string[];
}
export {};
