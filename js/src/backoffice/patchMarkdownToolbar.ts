import {Vnode} from 'mithril';
import {extend} from 'flarum/common/extend';
import TextEditor from 'flarum/common/components/TextEditor';

// Adds the missing type=button to the MarkdownButton component
// because it causes formatting buttons to submit our forms
// MarkdownButton isn't exported so we need to extract the prototype from the ItemList
// @see https://github.com/flarum/core/issues/2875
export default function () {
    let patched = false;

    extend(TextEditor.prototype, 'toolbarItems', function (items) {
        if (patched) {
            return;
        }

        if (items.has('markdown')) {
            extend(items.get('markdown').children[0].tag.prototype, 'view', function (vdom: Vnode) {
                // TODO: this will break in Flarum 1.0 because the button is sometimes wrapped in the Tooltip component
                // also the upstream fix likely ships with 1.0
                vdom.attrs.type = 'button';
            });

            patched = true;
        }
    });
}
