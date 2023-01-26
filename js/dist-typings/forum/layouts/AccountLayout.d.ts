/// <reference types="flarum/@types/translator-icu-rich" />
import AbstractAccountLayout from './AbstractAccountLayout';
export default class AccountLayout extends AbstractAccountLayout {
    className(): string;
    title(): import("@askvortsov/rich-icu-message-formatter").NestedStringArray;
    currentPageHref(): string;
    content(): any;
}
