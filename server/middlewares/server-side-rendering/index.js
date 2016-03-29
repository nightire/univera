module.exports = serverSideRendering;

function serverSideRendering(options) {
  return async function ssr(context, next) {
    context.body = htmlTemplate(options);
    await next();
  }
}

function htmlTemplate(options = {
  title: 'untitled'
}) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8"/>
      <title>${options.title}</title>
    </head>
    <body>
      <h1>Univera - An Universal Application Architecture</h1>
    </body>
    </html>
  `.replace(/(^\s+)|(\n)/gm, '');
}
