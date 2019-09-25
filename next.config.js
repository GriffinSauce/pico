const path = require('path');
const glob = require('glob');
const withSourceMaps = require('@zeit/next-source-maps')();

module.exports = withSourceMaps({
  webpack: (config, options) => {
    if (!options.isServer) {
      config.resolve.alias['@sentry/node'] = '@sentry/browser';
    }

    config.module.rules.push({
      test: /\.test.js$/,
      loader: 'ignore-loader',
    });
    return config;
  },
});
