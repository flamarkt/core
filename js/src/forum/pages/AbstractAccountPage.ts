import app from 'flarum/forum/app';
import LinkButton from 'flarum/common/components/LinkButton';
import AbstractShopPage from './AbstractShopPage';

/**
 * @deprecated replaced by Layout
 */
export default abstract class AbstractAccountPage extends AbstractShopPage {
    breadcrumbItems() {
        const items = super.breadcrumbItems();

        items.add('account', LinkButton.component({
            href: app.route('flamarkt.account'),
        }, 'Account' as any));

        return items;
    }
}
