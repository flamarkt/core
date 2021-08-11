// Mithril
import Mithril from 'mithril';

declare global {
    const m: Mithril.Static;
}

import ForumApplication from 'flarum/forum/ForumApplication';
import AdminApplication from 'flarum/admin/AdminApplication';
import User from 'flarum/common/models/User';
import CartState from './src/forum/states/CartState';
import Product from './src/common/models/Product';
import Order from './src/common/models/Order';

export interface AdditionalApplication {
    cart: CartState
    route: {
        product(product: Product): string,
        user(user: User): string,
        order(order: Order): string,
    }
}

declare module 'flarum/common/Store' {
    interface StoreModels {
        [key: string]: any
    }

    export default interface Store {
        models: StoreModels
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
