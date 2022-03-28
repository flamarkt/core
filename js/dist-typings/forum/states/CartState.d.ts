import Cart from '../../common/models/Cart';
export default class CartState {
    cart: Cart | null;
    loading: boolean;
    priceTotal(): number | null;
    productCount(): number | null;
    boot(): void;
    load(): void;
}
