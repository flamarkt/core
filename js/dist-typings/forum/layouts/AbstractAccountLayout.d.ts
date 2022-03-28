import AbstractShopLayout, { AbstractShopLayoutAttrs } from './AbstractShopLayout';
export interface AbstractAccountLayoutAttrs extends AbstractShopLayoutAttrs {
}
export default abstract class AbstractAccountLayout<T = AbstractAccountLayoutAttrs> extends AbstractShopLayout<T> {
    breadcrumbItems(): import("flarum/common/utils/ItemList").default<any>;
}
