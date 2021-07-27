import AbstractRelationshipSelect from './AbstractRelationshipSelect';
import User from 'flarum/common/models/User';
import username from 'flarum/common/helpers/username';
import highlight from 'flarum/common/helpers/highlight';
import avatar from 'flarum/common/helpers/avatar';

export default class UserRelationshipSelect extends AbstractRelationshipSelect<User> {
    protected resultsCache = new Map<string, User[]>();

    className() {
        return 'UserRelationshipSelect';
    }

    search(query: string) {
        if (!query) {
            m.redraw();
            return Promise.resolve();
        }

        return app.store
            .find('users', {
                filter: {q: query},
                page: {limit: 5},
            })
            .then((results) => {
                this.resultsCache.set(query, results);
                m.redraw();
            });
    }

    results(query: string) {
        if (!query) {
            return [];
        }

        query = query.toLowerCase();

        const results = this.resultsCache.get(query);

        // Indicates still loading
        if (typeof results === 'undefined') {
            return null;
        }

        return (results || [])
            .concat(
                app.store
                    .all('users')
                    .filter((user) => [user.username(), user.displayName()].some((value) => value.toLowerCase().substr(0, query.length) === query))
            )
            .filter((e, i, arr) => arr.lastIndexOf(e) === i)
            .sort((a, b) => a.displayName().localeCompare(b.displayName()));
    }

    item(user: User, query?: string) {
        const name = username(user);

        return [
            avatar(user),
            query ? {
                // Re-build a Mithril text node into a tag node with highlight
                ...name,
                text: undefined,
                children: [highlight(name.text as string, query)],
            } : name,
        ];
    }
}
