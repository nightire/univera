import {resolve} from 'path';
import {readFileSync} from 'fs';

const A_DAY_IN_MS = 86400000;
const A_YEAR_IN_MS = 31556926000;
const DEFAULT_PATH = '/favicon.ico';

let icon;

export default (path = resolve(DEFAULT_PATH), options = {}) => {
  const maxAge = options.maxAge == null
    ? A_DAY_IN_MS
    : Math.min(Math.max(0, options.maxAge), A_YEAR_IN_MS);

  return async function favicon(context, next) {
    if (DEFAULT_PATH != context.path) {
      return await next();
    }

    if ('GET' != context.method && 'HEAD' != context.method) {
      context.set('Allow', 'GET, HEAD, OPTIONS');
      context.status = 'OPTIONS' == context.method ? 200 : 405;
    } else {
      icon = icon || readFileSync(path);
      context.set('Cache-Control', `public, max-age=${maxAge / 1000 | 0}`);
      context.type = 'image/x-icon';
      context.body = icon;
    }
  }
};
