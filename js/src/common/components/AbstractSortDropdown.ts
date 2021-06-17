import Component, {ComponentAttrs} from 'flarum/common/Component';
import Dropdown from 'flarum/common/components/Dropdown';
import Button from 'flarum/common/components/Button';
import Model from 'flarum/common/Model';
import AbstractListState from '../states/AbstractListState';

export interface SortDropdownAttrs extends ComponentAttrs {
    state: AbstractListState<Model>
    updateUrl?: boolean
}

export interface SortOptions {
    [key: string]: string
}

export default abstract class AbstractSortDropdown<T extends SortDropdownAttrs> extends Component<T> {
    view() {
        const options = this.options();

        const activeSort = this.activeSort();

        return m(Dropdown, {
            className: 'SortDropdown ' + this.className(),
            buttonClassName: 'Button',
            label: options[activeSort],
        }, Object.keys(options).map((value) => {
            const label = options[value];
            const active = value === this.activeSort();

            return m(Button, {
                icon: active ? 'fas fa-check' : true,
                onclick: () => {
                    this.applySort(value);
                },
                active,
            }, label);
        }));
    }

    className(): string {
        return '';
    }

    activeSort(): string {
        return this.attrs.state.params.sort || this.defaultSort();
    }

    applySort(sort: string) {
        // Clone params otherwise it causes a page refresh even without m.route.set
        const params = {...m.route.param()};

        if (this.defaultSort() === sort) {
            delete this.attrs.state.params.sort;
            delete params.sort;
        } else {
            this.attrs.state.params.sort = sort;
            params.sort = sort;
        }

        if (this.attrs.updateUrl) {
            delete params.key;

            // @ts-ignore
            const {routeName} = app.current.data;

            m.route.set(app.route(routeName, params));
        } else {
            this.attrs.state.refresh();
        }
    }

    abstract options(): SortOptions

    defaultSort(): string {
        return Object.keys(this.options())[0];
    }
}

