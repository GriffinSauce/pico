const path = require('path');
const glob = require('glob');

module.exports = {
  env: {
    MONGO_PASSWORD: '@environment-mongo_password',
    MONGO_USER: '@environment-mongo_user',
  },
  webpack: (config, { dev }) => {
    config.module.rules.push({
      test: /\.test.js$/,
      loader: 'ignore-loader',
    });
    return config;
  },
};
