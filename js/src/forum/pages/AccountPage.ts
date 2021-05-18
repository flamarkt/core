import Page from 'flarum/common/components/Page';
import AccountLayout from '../layouts/AccountLayout';

export default class AccountPage extends Page {
    view() {
        return AccountLayout.component();
    }
}
