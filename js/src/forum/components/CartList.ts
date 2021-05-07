import Component from 'flarum/common/Component';
import LinkButton from "flarum/common/components/LinkButton";

export default class CartList extends Component {
    view() {
        return m('.CartDropdownList', [
            LinkButton.component({
                className: 'Button Button--primary Button--block',
                href: app.route('flamarkt.cart'),
            }, 'Go to cart'),
        ]);
    }
}
