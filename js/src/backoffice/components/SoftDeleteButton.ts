import Component, {ComponentAttrs} from 'flarum/common/Component';
import Button from 'flarum/common/components/Button';

interface SoftDeleteButtonAttrs extends ComponentAttrs {
    model: {
        exists: boolean
        isHidden(): boolean
        save(attributes: any): any
    }
}

export default class SoftDeleteButton extends Component<SoftDeleteButtonAttrs> {
    saving: boolean = false;

    view() {
        const {model} = this.attrs;

        if (!model.exists) {
            return null;
        }

        return m(Button, {
            className: 'Button',
            icon: model.isHidden() ? 'fas fa-eye' : 'fas fa-eye-slash',
            onclick: () => {
                this.saving = true;

                model.save({
                    isHidden: !model.isHidden(),
                }).then(() => {
                    this.saving = false;
                    m.redraw();
                }).catch((error: any) => {
                    this.saving = false;
                    m.redraw();

                    throw error;
                });
            },
        }, model.isHidden() ? 'Restore' : 'Soft Delete');
    }
}
