import AbstractSortDropdown, { SortDropdownAttrs, SortOptions } from '../../common/components/AbstractSortDropdown';
import UserListState from '../states/UserListState';
export interface UserSortDropdownAttrs extends SortDropdownAttrs {
    state: UserListState;
}
export default class UserSortDropdown extends AbstractSortDropdown<UserSortDropdownAttrs> {
    className(): string;
    options(): SortOptions;
}
