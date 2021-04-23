// Mithril
import Mithril from 'mithril';

declare global {
    const m: Mithril.Static;
}

import Application from 'flarum/common/Application';

declare global {
    const app: Application;
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
