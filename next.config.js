const withCSS = require('@zeit/next-css');
const withSourceMaps = require('@zeit/next-source-maps')();
const withOffline = require('next-offline');

/* eslint-disable no-param-reassign */
module.exports = withOffline(
  withSourceMaps(
    withCSS({
      target: 'serverless',
      transformManifest: manifest => ['/'].concat(manifest), // add the homepage to the cache
      workboxOpts: {
        swDest: 'static/service-worker.js',
        runtimeCaching: [
          {
            urlPattern: /^https?.*/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'https-calls',
              networkTimeoutSeconds: 15,
              expiration: {
                maxEntries: 150,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
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
    }),
  ),
);
