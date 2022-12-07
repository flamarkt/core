import {Vnode} from 'mithril';
import Component, {ComponentAttrs} from 'flarum/common/Component';
import classList from 'flarum/common/utils/classList';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import icon from 'flarum/common/helpers/icon';

export type InlineSubmitStatusResult = 'success' | 'error' | null;

export interface InlineSubmitStatusAttrs extends ComponentAttrs {
    loading?: boolean
    result?: InlineSubmitStatusResult
}

export default class InlineSubmitStatus extends Component<InlineSubmitStatusAttrs> {
    view(vnode: Vnode<InlineSubmitStatusAttrs, this>) {
        return m('span.FlamarktInlineSubmitStatus', {
            className: classList({
                success: this.attrs.result === 'success',
                error: this.attrs.result === 'error',
            }),
        }, this.content());
    }

    content() {
        if (this.attrs.loading) {
            return LoadingIndicator.component({
                display: 'inline',
                size: 'small',
            });
        }

        switch (this.attrs.result) {
            case 'success':
                return icon('fas fa-check');
            case 'error':
                return icon('fas fa-times');
        }

        return null;
    }
}
