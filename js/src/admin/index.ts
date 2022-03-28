import {extend} from 'flarum/common/extend';
import BasicsPage from 'flarum/admin/components/BasicsPage';

app.initializers.add('flamarkt-core', () => {
    extend(BasicsPage.prototype, 'homePageItems', function (items) {
        items.add('flamarkt-products', {
            path: '/products',
            label: app.translator.trans('flamarkt-core.admin.homepage.products'),
        });
    });
});
