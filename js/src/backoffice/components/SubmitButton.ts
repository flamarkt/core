import Component from 'flarum/common/Component';
import Button from "flarum/common/components/Button";

export default class SubmitButton extends Component {
    view(vnode) {
        const {
            exists = false,
            dirty = true,
            ...attrs
        } = vnode.attrs;

        let label = '';

        // Check if children is truthy or is an array containing anything that's truthy
        if (Array.isArray(vnode.children) ? vnode.children.some(a => a) : vnode.children) {
            label = vnode.children;
        } else if (exists) {
            if (dirty) {
                //TODO: translations
                label = 'Save';
            } else {
                label = 'Saved';
            }
        } else {
            label = 'Create';
        }

        return Button.component({
            type: 'submit',
            className: 'Button Button--primary',
            disabled: exists && !dirty,
            ...attrs,
        }, label);
    }
}
