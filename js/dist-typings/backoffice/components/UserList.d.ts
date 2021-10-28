import AbstractList from './AbstractList';
import User from 'flarum/common/models/User';
export default class UserList extends AbstractList<User> {
    head(): import("flarum/common/utils/ItemList").default;
    columns(user: User): import("flarum/common/utils/ItemList").default;
    actions(user: User): import("flarum/common/utils/ItemList").default;
}
