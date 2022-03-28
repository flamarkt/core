import AbstractShopPage from './AbstractShopPage';
/**
 * @deprecated replaced by Layout
 */
export default abstract class AbstractAccountPage extends AbstractShopPage {
    breadcrumbItems(): import("flarum/common/utils/ItemList").default<any>;
}
