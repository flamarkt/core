import AbstractAccountPage from './AbstractAccountPage';
import AccountControls from '../utils/AccountControls';

export default class AccountPage extends AbstractAccountPage {
    content() {
        return m('.AccountPage', m('.container', [
            AccountControls.controls(app.session.user).toArray(),
        ]));
    }
}
