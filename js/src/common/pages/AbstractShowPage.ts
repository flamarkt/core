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

    /**
     * This method allows saving a model without the values changing in the store before a successful save
     * It's important to use createRecord and model.pushData which don't update the store
     * @param id
     * @param attributes
     */
    saveThroughNewRecord<T extends Model = Model>(id: string, attributes: any): Promise<T> {
        const record = this.newRecord();

        if (!record) {
            return Promise.reject();
        }

        if (id) {
            record.pushData({id});
            record.exists = true;
        }

        return record.save(attributes);
    }
}
