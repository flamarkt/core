import Component, {ComponentAttrs} from 'flarum/common/Component';
import Dropdown from 'flarum/common/components/Dropdown';
import Button from 'flarum/common/components/Button';
import Model from 'flarum/common/Model';
import AbstractListState from '../states/AbstractListState';

export interface SortDropdownAttrs extends ComponentAttrs {
    state: AbstractListState<Model>
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
        if (this.defaultSort() === sort) {
            delete this.attrs.state.params.sort;
        } else {
            this.attrs.state.params.sort = sort;
        }

        this.attrs.state.refresh();
    }

    abstract options(): SortOptions

    defaultSort(): string {
        return Object.keys(this.options())[0];
    }
}

