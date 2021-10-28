/// <reference types="mithril" />
import Component, { ComponentAttrs } from 'flarum/common/Component';
interface PermanentDeleteButtonAttrs extends ComponentAttrs {
    model: {
        isHidden(): boolean;
        delete(): any;
    };
    afterdelete(): void;
}
export default class PermanentDeleteButton extends Component<PermanentDeleteButtonAttrs> {
    saving: boolean;
    view(): import("mithril").Vnode<{
        className: string;
        icon: string;
        onclick: () => void;
    }, unknown> | null;
}
export {};
