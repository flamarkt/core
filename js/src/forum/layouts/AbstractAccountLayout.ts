import app from 'flarum/forum/app';
import AbstractShopLayout, {AbstractShopLayoutAttrs} from './AbstractShopLayout';
import LinkButton from 'flarum/common/components/LinkButton';

export interface AbstractAccountLayoutAttrs extends AbstractShopLayoutAttrs {
    // nothing special, but that way it can be extended
}

export default abstract class AbstractAccountLayout<T = AbstractAccountLayoutAttrs> extends AbstractShopLayout<T> {
    breadcrumbItems() {
        const items = super.breadcrumbItems();

        if (this.currentPageHref() !== app.route('flamarkt.account')) {
            items.add('account', LinkButton.component({
                href: app.route('flamarkt.account'),
            }, app.translator.trans('flamarkt-core.forum.account.breadcrumb')));
        }

        return items;
    }
}
