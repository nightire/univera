/**
 * Render whatever passed in to plain HTML text as response body.
 *
 * @param {Object}  [options]
 * @param {String}  [options.charset='UTF-8']
 * @param {String}  [options.meta] - Any sorts of meta tags provided to render
 * in `<head/>`.
 * @param {String}  [options.content=''] - Usually the text from any server-side
 * rendering function such as `ReactDOMServer.renderToString()`.
 * @param {Boolean} [options.compact] - Determine whether to return compact text
 * which all `\r\n` will be trimmed.
 * @returns {XML|string}
 */
export default function ssrTemplate(options) {
  const context = Object.assign({}, {
    charset: `UTF-8`,
    meta: `
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
    `,
    compact: options.env === 'production'
  }, options);

  return context.compact
    ? renderHTML(context).replace(/^\s+|\s*(?:\r?\n)+/gm, '')
    : renderHTML(context).replace(/^\s+/gm, '');
}

const renderHTML = context => `
  <!DOCTYPE html>
  <html lang="${context.language}">
  <head>
    <meta charset="${context.charset}"/>
    <title>${context.name}</title>
    ${context.meta}
  </head>
  <body>
    ${context.content}
    <script src="/assets/vendor.js"></script>
    <script src="/assets/client.js"></script>
  </body>
  </html>
`;
