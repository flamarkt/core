import AbstractShowPage from '../../common/pages/AbstractShowPage';
import User from 'flarum/common/models/User';
import ItemList from 'flarum/common/utils/ItemList';
export default class UserShowPage extends AbstractShowPage {
    user: User | null;
    saving: boolean;
    dirty: boolean;
    username: string;
    password: string;
    email: string;
    newRecord(): any;
    findType(): string;
    show(user: User): void;
    view(): any;
    fields(): ItemList;
    data(): any;
    onsubmit(event: Event): void;
}
