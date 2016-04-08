import webpackDevMiddleware from 'webpack-dev-middleware';

// TODO: extract stats out as individual configuration.
const stats = {chunkModules: false, colors: false};

export default (compiler, publicPath, options = {}) => {
  options = Object.assign({}, {publicPath, stats}, options);
  const middleware = webpackDevMiddleware(compiler, options);

  return async function webpackDevMiddleware(context, next) {
    const hasNext = await applyMiddleware(middleware, context.req, {
      send: content => context.body = content,
      setHeader: function() {context.set.apply(context, arguments)}
    });

    hasNext && await next();
  };
};

function applyMiddleware(middleware, req, res) {
  const _send = res.send;

  return new Promise((resolve, reject) => {
    try {
      res.send = function() {_send.apply(null, arguments) && resolve(false)};
      middleware(req, res, resolve.bind(null, true));
    } catch (error) {
      reject(error);
    }
  });
}
