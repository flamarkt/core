import Page from 'flarum/common/components/Page';

export default class AbstractShowPage extends Page {
    oninit(vnode) {
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
        } else if (preloaded) {
            this.show(preloaded);
        } else {
            const params = this.requestParams();

            app.store.find(this.findType(), id, params).then(model => {
                this.show(model);

                m.redraw();
            });
        }
    }

    newRecord() {
        return null;
    }

    findType() {
        return '';
    }

    requestParams() {
        return {
            bySlug: true,
        };
    }

    show(model) {
        //
    }
}
