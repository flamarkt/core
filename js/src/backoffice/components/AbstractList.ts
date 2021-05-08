import ItemList from 'flarum/common/utils/ItemList';
import listItems from 'flarum/common/helpers/listItems';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import Button from 'flarum/common/components/Button';
import Placeholder from 'flarum/common/components/Placeholder';
import Model from 'flarum/common/Model';
import {ClassComponent} from 'mithril';

export default class AbstractList implements ClassComponent {
    items(state): Model[] {
        return [].concat(...state.pages.map(page => page.items));
    }

    topRow(state) {
        return null;
    }

    bottomRow(state) {
        if (state.loading) {
            return LoadingIndicator.component();
        } else if (state.moreResults) {
            return Button.component({
                className: 'Button',
                onclick: state.loadMore.bind(state),
            }, app.translator.trans('load-more'));
        }

        if (state.pages.length === 0 && !state.loading) {
            return Placeholder.component({
                text: app.translator.trans('empty'),
            });
        }

    }

    view(vnode) {
        const {state} = vnode.attrs;

        return m('table.Table', [
            m('thead', this.head().toArray()),
            m('tbody', [
                this.topRow(state),
                this.items(state).map(model => this.row(model)),
                this.bottomRow(state),
            ]),
        ]);
    }

    head(): ItemList {
        const columns = new ItemList();

        columns.add('actions', m('th', 'Actions'), -100);//TODO

        return columns;
    }

    row(model) {
        return m('tr', this.rowAttrs(model), this.columns(model).toArray());
    }

    rowAttrs(model): any {
        return {};
    }

    columns(model): ItemList {
        const columns = new ItemList();

        columns.add('actions', m('td', m('ul.Table-actions', listItems(this.actions(model).toArray()))), -100);

        return columns;
    }

    actions(model): ItemList {
        return new ItemList();
    }
}