import {resolve} from 'path'

export default function ssrTemplate(options) {
  options.assets = require(resolve('public/assets/manifest.json'))

  return options.compact
    ? renderHTML(options).replace(/^\s+|\s*(?:\r?\n)+/gm, '')
    : renderHTML(options).replace(/^\s+/gm, '')
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
    <script src=${context.assets.vendor.js}></script>
    <script src=${context.assets.client.js}></script>
  </body>
  </html>
`
