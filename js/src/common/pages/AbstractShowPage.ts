import * as Mithril from 'mithril';
import {ComponentAttrs} from 'flarum/common/Component';
import Page from 'flarum/common/components/Page';
import Model from 'flarum/common/Model';

export default abstract class AbstractShowPage extends Page {
    oninit(vnode: Mithril.Vnode<ComponentAttrs>) {
        super.oninit(vnode);

        this.load();
    }

    load() {
        const preloaded = app.preloadedApiDocument();

        const id = m.route.param('id');

        if (id === 'new') {
            const newRecord = this.newRecord();

            if (newRecord) {
                this.show(newRecord);
            }
        } else if (preloaded instanceof Model) {
            this.show(preloaded);
        } else {
            const params = this.requestParams();

            app.store.find(this.findType(), id, params).then(model => {
                this.show(model);

                m.redraw();
            });
        }
    }

    newRecord(): Model | null {
        return null;
    }

    findType(): string {
        return '';
    }

    requestParams(): any {
        return {
            bySlug: true,
        };
    }

    show(model: Model) {
        //
    }
}
