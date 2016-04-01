export default options => async function ssrRouteHandler(context, next) {
  context.body = require('./template')(options);
  await next();
}
