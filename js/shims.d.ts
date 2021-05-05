// Mithril
import Mithril from 'mithril';

declare global {
    const m: Mithril.Static;
}

//import Application from 'flarum/common/Application';
import BaseForumApplication from 'flarum/forum/ForumApplication';
import AdminApplication from 'flarum/admin/AdminApplication';
import Cart from './src/common/models/Cart';

declare global {
    interface ForumApplication extends BaseForumApplication {
        cart: Cart
    }

    const app: ForumApplication & AdminApplication;
}

// Fix wrong signatures from Flarum
declare module 'flarum/common/Translator' {
    export default interface Translator {
        // Make second parameter optional
        trans(id: any, parameters?: any): any;
    }
}

import User from 'flarum/common/models/User';

declare module 'flarum/common/helpers/username' {
    // Allow passing null or undefined
    export default function username(user: User | null | undefined | false);
}
