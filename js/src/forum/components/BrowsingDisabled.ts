import app from 'flarum/forum/app';
import Component from 'flarum/common/Component';
import ItemList from 'flarum/common/utils/ItemList';

export default class BrowsingDisabled extends Component {
    view() {
        return m('.FlamarktBrowsingDisabled', this.items().toArray());
    }

    items(): ItemList<any> {
        const items = new ItemList();

        items.add('title', m('h3', app.translator.trans('flamarkt-core.forum.browsingDisabled.title')), 20);
        items.add('message', m('p', app.translator.trans('flamarkt-core.forum.browsingDisabled.message')), 10);

        return items;
    }
}
