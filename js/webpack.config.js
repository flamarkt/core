const config = require('flarum-webpack-config')();

config.entry = {
    admin: './admin.ts',
    backoffice: './backoffice.ts',
    forum: './forum.ts',
    mithril2html: './mithril2html.ts',
};

// We need to import through our external namespace because we need changes that the forum bundle makes on the components
// This is also used for backoffice imports
config.externals.push(function ({context, request}, callback) {
    let matches;
    if ((matches = /^(flamarkt\/[^/]+)\/([^/]+)\/(.+)$/.exec(request))) {
        return callback(null, 'root ((flarum.extensions[\'' + matches[1].replace('/', '-') + '\']||{})[\'' + matches[2] + '\']||{})[\'' + matches[3] + '\']');
    }
    callback();
});

module.exports = config;
