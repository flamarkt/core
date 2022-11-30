import ForumApplication from 'flarum/forum/ForumApplication';
import AdminApplication from 'flarum/admin/AdminApplication';
import User from 'flarum/common/models/User';
import CartState from './src/forum/states/CartState';
import Cart from './src/common/models/Cart';
import Order from './src/common/models/Order';
import Product from './src/common/models/Product';

export interface AdditionalApplication {
    cart: CartState
    route: {
        product(product: Product): string,
        user(user: User): string,
        order(order: Order): string,
    }
}

declare module 'flarum/forum/ForumApplication' {
    export default interface ForumApplication {
        cart: CartState
        route: {
            product(product: Product): string,
            user(user: User): string,
            order(order: Order): string,
        }
    }
}

declare global {
    const app: ForumApplication & AdminApplication & AdditionalApplication;
}

declare module 'flarum/common/helpers/username' {
    // Allow passing null or undefined
    export default function username(user: User | null | undefined | false): any;
}

declare module 'flarum/common/models/User' {
    export default interface User {
        slug(): string

        username(value?: string): string

        email(value?: string): string

        flamarktOrderCount(value?: number): number
    }
}

declare module 'flarum/common/models/Forum' {
    export default interface Forum {
        cart(): Cart | false
    }
}
