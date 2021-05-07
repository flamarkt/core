import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import AbstractShowPage from '../../common/pages/AbstractShowPage';
import User from 'flarum/common/models/User';
import SubmitButton from '../components/SubmitButton';

export default class UserShowPage extends AbstractShowPage {
    user: User | null = null;
    saving: boolean = false;
    dirty: boolean = false;
    username: string = '';
    email: string = '';

    newRecord() {
        return app.store.createRecord('users');
    }

    findType() {
        return 'users';
    }

    show(user: User) {
        this.user = user;
        this.username = user.username() || '';
        this.email = user.email() || '';

        // @ts-ignore
        app.setTitle(user.email());
        app.setTitleCount(0);
    }

    view() {
        if (!this.user) {
            return LoadingIndicator.component();
        }

        return m('form.UserShowPage', {
            onsubmit: this.onsubmit.bind(this),
        }, m('.container', [
            m('.Form-group', [
                m('label', app.translator.trans('flamarkt-core.backoffice.users.field.username')),
                m('input.FormControl', {
                    type: 'text',
                    value: this.username,
                    oninput: event => {
                        this.username = event.target.value;
                        this.dirty = true;
                    },
                }),
            ]),
            m('.Form-group', [
                m('label', app.translator.trans('flamarkt-core.backoffice.users.field.email')),
                m('input.FormControl', {
                    type: 'email',
                    value: this.email,
                    oninput: event => {
                        this.email = event.target.value;
                        this.dirty = true;
                    },
                }),
            ]),
            m('.Form-group', [
                SubmitButton.component({
                    loading: this.saving,
                    dirty: this.dirty,
                    exists: this.user.exists,
                }),
            ]),
        ]));
    }

    data() {
        return {
            username: this.username,
            email: this.email,
        };
    }

    onsubmit(event) {
        event.preventDefault();

        this.saving = true;

        // @ts-ignore
        this.user.save(this.data()).then(user => {
            this.user = user;

            this.saving = false;
            this.dirty = false;
            m.redraw();

            m.route.set(app.route.user(user));
        }).catch(error => {
            this.saving = false;
            m.redraw();
        });
    }
}
