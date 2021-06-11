import AbstractSortDropdown, {SortDropdownAttrs, SortOptions} from '../../common/components/AbstractSortDropdown';
import UserListState from '../states/UserListState';

export interface UserSortDropdownAttrs extends SortDropdownAttrs {
    state: UserListState
}

export default class UserSortDropdown extends AbstractSortDropdown<UserSortDropdownAttrs> {
    className(): string {
        return 'UserSortDropdown';
    }

    options(): SortOptions {
        return {
            'default': 'Default sort',
            '-joinedAt': 'Newest',
            'joinedAt': 'Oldest',
            '-lastSeenAt': 'Seen recently',
            'lastSeenAt': 'Seen least recently',
            'username': 'Username ASC',
            '-username': 'Username DESC',
            'commentCount': 'Comment count ASC',
            '-commentCount': 'Comment count DESC',
            'discussionCount': 'Discussion count ASC',
            '-discussionCount': 'Discussion count DESC',
        };
    }
}
