// Mithril
import Mithril from 'mithril';

declare global {
    const m: Mithril.Static;
}

import ForumApplication from 'flarum/forum/ForumApplication';
import AdminApplication from 'flarum/admin/AdminApplication';
import User from 'flarum/common/models/User';
import Cart from './src/common/models/Cart';
import Product from './src/common/models/Product';
import Order from './src/common/models/Order';

export interface AdditionalApplication {
    cart: Cart
    route: {
        product(product: Product),
        user(user: User),
        order(order: Order),
    }
}

declare global {
    const app: ForumApplication & AdminApplication & AdditionalApplication;
}

// Fix wrong signatures from Flarum
declare module 'flarum/common/Translator' {
    export default interface Translator {
        // Make second parameter optional
        trans(id: any, parameters?: any): any;
    }
}

declare module 'flarum/common/helpers/username' {
    // Allow passing null or undefined
    export default function username(user: User | null | undefined | false);
}

declare module 'flarum/common/models/User' {
    export default interface User {
        slug(): string

        username(value?: string): string

        email(value?: string): string
    }
}
