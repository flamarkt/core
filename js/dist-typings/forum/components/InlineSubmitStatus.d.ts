import { Vnode } from 'mithril';
import Component, { ComponentAttrs } from 'flarum/common/Component';
export declare type InlineSubmitStatusResult = 'success' | 'error' | null;
export interface InlineSubmitStatusAttrs extends ComponentAttrs {
    loading?: boolean;
    result?: InlineSubmitStatusResult;
}
export default class InlineSubmitStatus extends Component<InlineSubmitStatusAttrs> {
    view(vnode: Vnode<InlineSubmitStatusAttrs, this>): any;
    content(): any;
}
