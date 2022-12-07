import Cart from '../../common/models/Cart';
export default class CartState {
    cart: Cart | null;
    loading: boolean;
    priceTotal(): number | null;
    productCount(): number | null;
    /**
     * To be called by Flamarkt itself with the boot payload
     */
    boot(): void;
    /**
     * Separate method so that extensions can retrieve a cart update without triggering the loading status or redraw
     * But with all the same relationships.
     */
    request(): Promise<Cart>;
    /**
     * Intended to be used with a manually retrieved value with request()
     * @param cart
     */
    setCart(cart: Cart | null): void;
    /**
     * Refresh the global cart
     */
    load(): Promise<void>;
}
