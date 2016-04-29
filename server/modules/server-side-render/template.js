/**
 * Render whatever passed in to plain HTML text as response body.
 *
 * @param {Object}  [options]
 * @param {Boolean} [options.compact] - Determine whether to return compact text
 * which all `\r\n` will be trimmed.
 * @param {String}  [options.body=''] - Usually the text from any server-side
 * rendering function such as `ReactDOMServer.renderToString()`.
 * @returns {XML|string}
 */
export default function ssrTemplate(options) {
  const context = Object.assign({}, {
    compact: options.env === 'production',
    body: ''
  }, options);

  return context.compact
    ? renderHTML(context).replace(/^\s+|\s*(?:\r?\n)+/gm, '')
    : renderHTML(context).replace(/^\s+/gm, '');
}

const renderHTML = context => `
  <!DOCTYPE html>
  <html lang="${context.language}">
  <head>
    <title>${context.head.title}</title>
    ${context.head.meta.toString()}
  </head>
  <body>
    <div id="root">${context.body}</div>
    <script data-recycle>window.__INITIAL_STATE__ = ${context.state}</script>
    <script src="/assets/vendor.js"></script>
    <script src="/assets/client.js"></script>
  </body>
  </html>
`;
