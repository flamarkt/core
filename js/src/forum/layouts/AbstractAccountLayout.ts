import AbstractShopLayout, {AbstractShopLayoutAttrs} from './AbstractShopLayout';
import LinkButton from 'flarum/common/components/LinkButton';

export interface AbstractAccountLayoutAttrs extends AbstractShopLayoutAttrs {
    // nothing special, but that way it can be extended
}

export default abstract class AbstractAccountLayout<T = AbstractAccountLayoutAttrs> extends AbstractShopLayout {
    breadcrumbItems() {
        const items = super.breadcrumbItems();

        items.add('account', LinkButton.component({
            href: app.route('flamarkt.account'),
        }, 'Account'));

        return items;
    }
}
