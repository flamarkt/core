import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import AbstractShowPage from '../../common/pages/AbstractShowPage';
import User from 'flarum/common/models/User';
import SubmitButton from '../components/SubmitButton';
import ItemList from 'flarum/common/utils/ItemList';

export default class UserShowPage extends AbstractShowPage {
    user: User | null = null;
    saving: boolean = false;
    dirty: boolean = false;
    username: string = '';
    password: string = '';
    email: string = '';

    newRecord() {
        return app.store.createRecord('users', {
            // Same as product, we need to initialize the attributes to prevent errors
            // flamarkt/identity will read user.attribute()
            attributes: {},
        });
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
        }, m('.container.container--narrow', this.fields().toArray()));
    }

    fields(): ItemList {
        const fields = new ItemList();

        fields.add('username', m('.Form-group', [
            m('label', app.translator.trans('flamarkt-core.backoffice.users.field.username')),
            m('input.FormControl', {
                type: 'text',
                value: this.username,
                oninput: (event: Event) => {
                    this.username = (event.target as HTMLInputElement).value;
                    this.dirty = true;
                },
            }),
        ]));

        fields.add('email', m('.Form-group', [
            m('label', app.translator.trans('flamarkt-core.backoffice.users.field.email')),
            m('input.FormControl', {
                type: 'email',
                value: this.email,
                oninput: (event: Event) => {
                    this.email = (event.target as HTMLInputElement).value;
                    this.dirty = true;
                },
            }),
        ]));

        // We need to show password field for new users because Flarum requires password in REST API
        if (!this.user!.exists) {
            fields.add('password', m('.Form-group', [
                m('label', app.translator.trans('flamarkt-core.backoffice.users.field.password')),
                m('input.FormControl', {
                    type: 'password',
                    value: this.password,
                    oninput: (event: Event) => {
                        this.password = (event.target as HTMLInputElement).value;
                        this.dirty = true;
                    },
                }),
            ]));
        }

        fields.add('submit', m('.Form-group', [
            SubmitButton.component({
                loading: this.saving,
                dirty: this.dirty,
                exists: this.user!.exists,
            }),
        ]), -10);

        return fields;
    }

    data() {
        const data: any = {
            username: this.username,
            email: this.email,
        };

        if (this.password) {
            data.password = this.password;
        }

        return data;
    }

    onsubmit(event: Event) {
        event.preventDefault();

        this.saving = true;

        this.user!.save(this.data()).then(user => {
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
