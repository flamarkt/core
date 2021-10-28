/// <reference types="mithril" />
import AbstractAccountLayout from './AbstractAccountLayout';
export default class AccountLayout extends AbstractAccountLayout {
    className(): string;
    title(): any;
    currentPageHref(): string;
    content(): import("mithril").Vnode<any, any>;
}
