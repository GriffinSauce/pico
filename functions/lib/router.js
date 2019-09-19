/**
 * Express-like router for lambda functions
 * TODO: mimic req better by translating event props
 * TODO: document handlers and return value
 *
 * @example
 * const router = require('./utils/router')();
 * exports.handler = async (event, context) => {
 *   router.get('/things/:id', async (req) => {
 *       const thing = await getThing(req.params.id);
 *       return {
 *         statusCode: 200
 *         body: JSON.stringify(thing)
 *       }
 *   })
 *   return router.exec(event, context);
 * }
 */

const pathToRegexp = require('path-to-regexp');

// Return a clean API path
const cleanPath = path => path.replace('/.netlify/functions', '');
const getPath = event => cleanPath(event.path);

// Convert wildcard character to match whatever
const convertWildcard = path => path.replace('*', '(.*)');

const parseParams = (match, keys) =>
  keys.reduce((memo, key, index) => {
    return {
      ...memo,
      [key.name]: match[index + 1],
    };
  }, {});

const createRouter = () => {
  const handlers = [];
  return {
    get: (path, handler) => {
      handlers.push({
        method: 'GET',
        path,
        handler,
      });
    },
    post: (path, handler) => {
      handlers.push({
        method: 'POST',
        path,
        handler,
      });
    },
    exec: (event, context) => {
      let res;
      handlers.some(({ method, path, handler }) => {
        if (event.httpMethod !== method) return;

        const keys = [];
        const regexp = pathToRegexp(convertWildcard(path), keys);
        const match = regexp.exec(getPath(event));

        if (!match) return;

        const params = parseParams(match, keys);

        res = handler({ params, event, context });
        return true;
      });
      return res;
    },
  };
};

module.exports = createRouter;
