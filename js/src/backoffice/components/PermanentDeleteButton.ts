import Component, {ComponentAttrs} from 'flarum/common/Component';
import Button from 'flarum/common/components/Button';

interface PermanentDeleteButtonAttrs extends ComponentAttrs {
    model: {
        isHidden(): boolean
        delete(): any
    }

    afterdelete(): void
}

export default class PermanentDeleteButton extends Component<PermanentDeleteButtonAttrs> {
    saving: boolean = false;

    view() {
        const {model} = this.attrs;

        if (!model.isHidden()) {
            return null;
        }

        return m(Button, {
            className: 'Button',
            icon: 'fas fa-trash',
            onclick: () => {
                if (!confirm('Are you sure you want to permanently delete this record?')) {
                    return;
                }

                this.saving = true;

                model.delete().then(() => {
                    this.saving = false;
                    m.redraw();

                    this.attrs.afterdelete();
                }).catch((error: any) => {
                    this.saving = false;
                    m.redraw();

                    throw error;
                });
            },
        }, 'Delete Permanently');
    }
}
