import 'css-modules-require-hook/preset';

import matchAsyncPrefetch from './match-async-prefetch';

export default (options = {}) => async function ssrRouteHandler(context, next) {
  if (!options.language || !('string' === typeof options.language)) {
    options.language = context.state.language;
  }
  context.set('Content-Language', options.language);
  options.name = options.name || context.app.name;
  options.compact = options.compact || 'production' === context.app.env;

  const hasNext = await matchAsyncPrefetch(context, options);
  hasNext && await next();
};
