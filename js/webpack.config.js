const baseConfig = require('flarum-webpack-config');

function config() {
    const config = baseConfig();

    // Enable Typescript same way as Flarum Core
    config.resolve = {
        extensions: ['.ts', '.tsx', '.js', '.json'],
    }
    config.module.rules[0].test = /\.(tsx?|js)$/;
    config.module.rules[0].use.options.presets.push('@babel/preset-typescript');

    return config;
}

const backofficeConfig = {
    ...config(),
    entry: {
        'backoffice': './backoffice.js',
    },
};

// Use a named module because we will inject this file at the top of the assets without a wrapping extension
backofficeConfig.output.library = "flarum.extensions['flamarkt-core']";

module.exports = [
    config(),
    backofficeConfig,
];
