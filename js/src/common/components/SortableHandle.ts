import {ClassComponent} from 'mithril';
import icon from 'flarum/common/helpers/icon';

export default class SortableHandle implements ClassComponent {
    view(vnode) {
        const attrs: any = {
            className: vnode.attrs.className + ' js-handle',
        };

        if (vnode.attrs.disabled) {
            attrs.className += ' disabled';
        } else {
            attrs.draggable = 'true';
        }

        return m(vnode.attrs.elementTag || 'div', attrs, icon('fas fa-grip-lines'));
    }
}
