import ssrTemplate from './template';

export default options => async function ssrRouteHandler(context, next) {
  context.body = ssrTemplate(options);
  await next();
}
