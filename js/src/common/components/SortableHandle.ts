import {ClassComponent, Vnode} from 'mithril';
import icon from 'flarum/common/helpers/icon';

interface SortableHandleAttrs {
    elementTag?: string
    className?: string
    disabled?: boolean
}

export default class SortableHandle implements ClassComponent<SortableHandleAttrs> {
    view(vnode: Vnode<SortableHandleAttrs>) {
        const attrs: any = {
            className: (vnode.attrs.className ? vnode.attrs.className + ' ' : '') + 'js-handle',
        };

        if (vnode.attrs.disabled) {
            attrs.className += ' disabled';
        } else {
            attrs.draggable = 'true';
        }

        return m(vnode.attrs.elementTag || 'div', attrs, icon('fas fa-grip-lines'));
    }
}
