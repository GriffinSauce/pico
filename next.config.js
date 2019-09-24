const path = require('path');
const glob = require('glob');

module.exports = {
  env: {
    MONGO_PASSWORD: process.env.MONGO_PASSWORD,
    MONGO_USER: process.env.MONGO_USER,
  },
  webpack: (config, { dev }) => {
    config.module.rules.push({
      test: /\.test.js$/,
      loader: 'ignore-loader',
    });
    return config;
  },
};
