/// <reference path="../../../../vendor/flarum/core/js/src/common/translator-icu-rich.d.ts" />
import AbstractAccountLayout from './AbstractAccountLayout';
export default class AccountLayout extends AbstractAccountLayout {
    className(): string;
    title(): import("@askvortsov/rich-icu-message-formatter").NestedStringArray;
    currentPageHref(): string;
    content(): any;
}
