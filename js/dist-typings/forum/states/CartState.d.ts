import Cart from '../../common/models/Cart';
export default class CartState {
    cart: Cart | null;
    loading: boolean;
    priceTotal(): number | null | undefined;
    productCount(): number | null | undefined;
    boot(): void;
    load(): void;
}
