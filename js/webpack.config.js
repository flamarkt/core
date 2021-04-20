//const fs = require('fs');
//const path = require('path');
const baseConfig = require('flarum-webpack-config');

// Re-write the entry function to also parse the "embed" file
/*config.entry = () => {
    const entries = {};

    for (const app of ['forum', 'admin', 'backoffice']) {
        const file = path.resolve(process.cwd(), app + '.js');
        if (fs.existsSync(file)) {
            entries[app] = file;
        }
    }

    return entries;
};*/

const backofficeConfig = {
    ...baseConfig(),
    entry: {
        'backoffice': './backoffice.js',
    },
    /*output: {
        library: "flarum.extensions['flamarkt-core']",
    },*/
};

// Use a named module because we will inject this file at the top of the assets without a wrapping extension
backofficeConfig.output.library = "flarum.extensions['flamarkt-core']";

module.exports = [
    baseConfig(),
    backofficeConfig,
];
