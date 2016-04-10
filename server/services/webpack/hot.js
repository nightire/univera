import webpackHotMiddleware from 'webpack-hot-middleware';

export default compiler => {
  const middleware = webpackHotMiddleware(compiler);

  return async function webpackHotMiddleware(context, next) {
    const hasNext = await applyMiddleware(middleware, context.req, context.res);
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
