import { Vnode } from 'mithril';
import Component, { ComponentAttrs } from 'flarum/common/Component';
export interface InlineSubmitStatusAttrs extends ComponentAttrs {
    loading?: boolean;
    result?: 'success' | 'error' | null;
}
export default class InlineSubmitStatus extends Component<InlineSubmitStatusAttrs> {
    view(vnode: Vnode<InlineSubmitStatusAttrs, this>): any;
    content(): any;
}
