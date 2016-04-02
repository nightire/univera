export default async function extractLanguage(context, next) {
  context.state.language = context.request.acceptsLanguages()[0];
  await next();
}

