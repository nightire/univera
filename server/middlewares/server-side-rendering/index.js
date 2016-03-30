module.exports = (options) => async (context, next) => {
  context.body = htmlTemplate(options);
  await next();
};

const htmlTemplate = (
  options = {
    title: 'untitled'
  }
) => `
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
