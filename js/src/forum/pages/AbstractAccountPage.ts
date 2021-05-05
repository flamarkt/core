import AbstractShopPage from './AbstractShopPage';
import LinkButton from 'flarum/common/components/LinkButton';

export default abstract class AbstractAccountPage extends AbstractShopPage {
    breadcrumbItems() {
        const items = super.breadcrumbItems();

        items.add('account', LinkButton.component({
            href: app.route('flamarkt.account'),
        }, 'Account'));

        return items;
    }
}
