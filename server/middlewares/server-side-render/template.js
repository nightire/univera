/**
 * Render whatever passed in to plain HTML text as response body.
 *
 * @param {Object}  [options]
 * @param {String}  [options.locale='zh']
 * @param {String}  [options.charset='UTF-8']
 * @param {String}  [options.title=process.env.NAME]
 * @param {String}  [options.meta] - Any sorts of meta tags provided to render
 * in `<head/>`.
 * @param {String}  [options.content=''] - Usually the text from any server-side
 * rendering function such as `ReactDOMServer.renderToString()`.
 * @param {Boolean} [options.compact=process.env.NODE_ENV] - Determine whether
 * to return compact text, all `\r\n` will be trimmed.
 * @returns {XML|string}
 */
export default function ssrTemplate(options) {
  const context = Object.assign({}, {
    locale: `zh`,
    charset: `UTF-8`,
    title: process.env.NAME,
    meta: `
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
    `,
    compact: process.env.NODE_ENV === 'production'
  }, options);

  return context.compact
    ? renderHTML(context).replace(/^\s+|\s*(\r?\n)+\s*/gm, '')
    : renderHTML(context).replace(/^\s+/gm, '');
}

const renderHTML = context => `
  <!DOCTYPE html>
  <html lang=${context.locale}>
  <head>
    <meta charset="${context.charset}"/>
    <title>${context.title}</title>
    ${context.meta}
  </head>
  <body>
    <div id="react-root">${context.content || ''}</div>
  </body>
  </html>
`;
