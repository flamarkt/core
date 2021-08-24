const config = require('flarum-webpack-config');

const backofficeConfig = {
    ...config(),
    entry: {
        'backoffice': './backoffice.js',
    },
};

// Use a named module because we will inject this file at the top of the assets without a wrapping extension
backofficeConfig.output.library = "flarum.extensions['flamarkt-core']";

const mithril2htmlConfig = {
    ...config(),
    entry: {
        'mithril2html': './mithril2html.js',
    },
};

// We need to import through our external namespace because we need changes that the forum bundle makes on the components
mithril2htmlConfig.externals.push(function (context, request, callback) {
    let matches;
    if ((matches = /^(flamarkt\/[^/]+)\/([^/]+)\/(.+)$/.exec(request))) {
        return callback(null, 'root flarum.extensions[\'' + matches[1].replace('/', '-') + '\'][\'' + matches[2] + '\'][\'' + matches[3] + '\']');
    }
    callback();
});

module.exports = [
    config(),
    backofficeConfig,
    mithril2htmlConfig,
];
