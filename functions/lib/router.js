/**
 * Express-like router for lambda functions
 * TODO: mimic req better by translating event props
 * TODO: document handlers and return value
 * TODO: move cleanPath to an option
 * TODO: document that it won't 404 by default
 *
 * @example
 * const router = require('./utils/router')();
 * router.get('/things/:id', async (req) => {
 *   const thing = await getThing(req.params.id);
 *   return {
 *     statusCode: 200
 *     body: JSON.stringify(thing)
 *   }
 * })
 * exports.handler = router.handle;
 *
 */
const pathToRegexp = require('path-to-regexp');

const GET = 'GET';
const POST = 'POST';
const ANY = 'ANY';

// Return a clean API path
const cleanPath = path => path.replace('/.netlify/functions', '');

const getPath = event => cleanPath(event.path);

// Convert wildcard character to match whatever
const convertWildcard = path => path.replace('*', '(.*)');

// Takes output from path-to-regex and converts to a simple object
const parseParams = (match, keys) =>
  keys.reduce((memo, key, index) => {
    return {
      ...memo,
      [key.name]: match[index + 1],
    };
  }, {});

// Match the path and return url params - see path-to-regexp
const matchPath = ({ event, path }) => {
  const keys = [];
  const regexp = pathToRegexp(convertWildcard(path), keys);
  const match = regexp.exec(getPath(event));
  return {
    match,
    params: match ? parseParams(match, keys) : {},
  };
};

const createRouter = () => {
  const handlers = [];

  const createHandler = method => {
    return (path, handler) => {
      handlers.push({
        method,
        path,
        handler,
      });
    };
  };

  return {
    get: createHandler(GET),

    post: createHandler(POST),

    any: createHandler(ANY),

    handle: (event, context) => {
      let res;
      handlers.some(({ method, path, handler }) => {
        if (method !== ANY && event.httpMethod !== method) return;

        const { match, params } = getMatch({ event, path });
        if (!match) return;

        res = handler({ params, event, context });
        return true; // Handled, exit
      });
      return res;
    },
  };
};

module.exports = createRouter;
