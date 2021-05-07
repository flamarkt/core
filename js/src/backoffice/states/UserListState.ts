import AbstractListState from '../../common/states/AbstractListState';
import User from 'flarum/common/models/User';

export default class UserListState extends AbstractListState<User> {
    type() {
        return 'users';
    }
}
