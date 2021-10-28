import { Vnode } from 'mithril';
import Page from 'flarum/common/components/Page';
import Cart from '../../common/models/Cart';
export default class CartPage extends Page {
    loading: boolean;
    cart: Cart | null;
    oninit(vnode: Vnode): void;
    view(): any;
}
