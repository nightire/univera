import ssrTemplate from './template';

export default options => async function ssrRouteHandler(context, next) {
  if (!options.language || !('string' === typeof options.language)) {
    options.language = context.state.language;
    context.set('Content-Language', context.state.language);
  } else {
    context.set('Content-Language', options.language);
  }

  options.name = options.name || context.app.name;
  options.compact = options.compact || 'production' === context.app.env;

  context.body = ssrTemplate(options);
  await next();
}
