const pathToRegexp = require('path-to-regexp');

// Return a clean API path
const cleanPath = path => path.replace('/.netlify/functions', '');
const getPath = event => cleanPath(event.path);

/**
 * Get express-style req from a lambda event and path
 * Uses the same parser as express
 **/
module.exports = (event, method, path) => {
  if (event.httpMethod !== method) return;

  const keys = [];
  const regexp = pathToRegexp(path, keys);
  const match = regexp.exec(getPath(event));

  if (!match) return;

  console.log(`${event.httpMethod} - ${path}`);

  const params = keys.reduce((memo, key, index) => {
    return {
      ...memo,
      [key.name]: match[index + 1],
    };
  }, {});

  return { params };
};
