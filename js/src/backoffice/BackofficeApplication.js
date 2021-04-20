import Application from 'flarum/common/Application';
import Navigation from 'flarum/common/components/Navigation';
import HeaderPrimary from './components/HeaderPrimary';
import HeaderSecondary from './components/HeaderSecondary';
import BackofficeNav from './components/BackofficeNav';
import routes from './routes';
import History from 'flarum/forum/utils/History';

/* global m */

export default class BackofficeApplication extends Application {
    history = {
        canGoBack: () => true,
        getPrevious: () => {
        },
        backUrl: () => this.forum.attribute('baseUrl'),
        back: function () {
            window.location = this.backUrl();
        },
    };
    //history = new History();

    constructor() {
        super();

        routes(this);
    }

    mount() {
        const defaultRoute = this.forum.attribute('defaultRoute');
        let defaultAction = 'dashboard';

        for (const i in this.routes) {
            if (this.routes[i].path === defaultRoute) defaultAction = i;
        }

        this.routes[defaultAction].path = '/';
        //this.history.push(defaultAction, this.translator.trans('core.forum.header.back_to_index_tooltip'), '/');

        m.route.prefix = '/backoffice';
        super.mount(this.forum.attribute('basePath'));

        m.mount(document.getElementById('app-navigation'), {
            view: () =>
                Navigation.component({
                    className: 'App-backControl',
                    drawer: true,
                }),
        });
        m.mount(document.getElementById('header-navigation'), Navigation);
        m.mount(document.getElementById('header-primary'), HeaderPrimary);
        m.mount(document.getElementById('header-secondary'), HeaderSecondary);
        m.mount(document.getElementById('admin-navigation'), BackofficeNav);
    }
}
