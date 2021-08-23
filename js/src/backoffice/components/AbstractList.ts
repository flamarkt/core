import {Vnode} from 'mithril';
import ItemList from 'flarum/common/utils/ItemList';
import listItems from 'flarum/common/helpers/listItems';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import Button from 'flarum/common/components/Button';
import Placeholder from 'flarum/common/components/Placeholder';
import Model from 'flarum/common/Model';
import Component, {ComponentAttrs} from 'flarum/common/Component';
import AbstractListState from '../../common/states/AbstractListState';

interface AbstractListAttrs<T extends Model> extends ComponentAttrs {
    state: AbstractListState<T>
}

export default class AbstractList<T extends Model> extends Component<AbstractListAttrs<T>> {
    items(state: AbstractListState<T>): T[] {
        return ([] as T[]).concat(...state.pages.map(page => page.items));
    }

    topRow(state: AbstractListState<T>) {
        return null;
    }

    bottomRowContent(state: AbstractListState<T>) {
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

    bottomRow(state: AbstractListState<T>) {
        const content = this.bottomRowContent(state);

        return content ? m('tr', m('td', {
            colspan: 100,
        }, content)) : null;
    }

    view(vnode: Vnode<AbstractListAttrs<T>>) {
        const {state} = vnode.attrs;

        return m('table.Table', [
            m('thead', m('tr', this.head().toArray())),
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

    row(model: T) {
        return m('tr', this.rowAttrs(model), this.columns(model).toArray());
    }

    rowAttrs(model: T): any {
        return {};
    }

    columns(model: T): ItemList {
        const columns = new ItemList();

        columns.add('actions', m('td', m('ul.Table-actions', listItems(this.actions(model).toArray()))), -100);

        return columns;
    }

    actions(model: T): ItemList {
        return new ItemList();
    }
}
