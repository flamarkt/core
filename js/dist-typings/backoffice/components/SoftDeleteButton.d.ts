/// <reference types="mithril" />
import Component, { ComponentAttrs } from 'flarum/common/Component';
interface SoftDeleteButtonAttrs extends ComponentAttrs {
    model: {
        exists: boolean;
        isHidden(): boolean;
        save(attributes: any): any;
    };
}
export default class SoftDeleteButton extends Component<SoftDeleteButtonAttrs> {
    saving: boolean;
    view(): import("mithril").Vnode<{
        className: string;
        icon: string;
        onclick: () => void;
    }, unknown> | null;
}
export {};
