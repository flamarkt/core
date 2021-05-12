import Component from 'flarum/common/Component';

export default class CartPageSection extends Component {
    view(vnode) {
        return m('section', {
            className: 'CartPage-section ' + vnode.attrs.className,
        }, [
            m('h3', vnode.attrs.title),
            vnode.children,
        ]);
    }
}
