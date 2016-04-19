export default async function extractLanguage(context, next) {
  // TODO: what about '*'? It's better to enable passing default language here
  context.state.language = context.request.acceptsLanguages()[0];
  await next();
}
