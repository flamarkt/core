import Page from 'flarum/common/components/Page';

export default class DashboardPage extends Page {
    view() {
        return m('p', 'Hello World');
    }
}
