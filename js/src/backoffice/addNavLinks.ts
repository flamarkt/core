import app from 'flamarkt/backoffice/backoffice/app';
import {extend} from 'flarum/common/extend';
import BackofficeNav from 'flamarkt/backoffice/backoffice/components/BackofficeNav';
import ActiveLinkButton from "flamarkt/backoffice/common/components/ActiveLinkButton";

export default function () {
    extend(BackofficeNav.prototype, 'items', function(items) {
        items.add('products', ActiveLinkButton.component({
            href: app.route('products.index'),
            icon: 'fas fa-box',
            activeRoutes: [
                'products.*',
            ],
        }, app.translator.trans('flamarkt-core.backoffice.nav.products')), 40);

        items.add('orders', ActiveLinkButton.component({
            href: app.route('orders.index'),
            icon: 'fas fa-shopping-cart',
            activeRoutes: [
                'orders.*',
            ],
        }, app.translator.trans('flamarkt-core.backoffice.nav.orders')), 20);
    });
}
