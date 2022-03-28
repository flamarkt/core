import app from 'flarum/forum/app';
import User from 'flarum/common/models/User';
import ItemList from 'flarum/common/utils/ItemList';
import LinkButton from 'flarum/common/components/LinkButton';

export default {
    controls(user: User): ItemList<any> {
        const items = new ItemList();

        items.add('orders', LinkButton.component({
            href: app.route('flamarkt.account.orders'),
        }, 'Orders'), 10);

        items.add('settings', LinkButton.component({
            href: app.route('settings'),
        }, 'Settings'), -10);

        return items;
    }
}
