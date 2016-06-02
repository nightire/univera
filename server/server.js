import Koa from 'koa'
import {resolve} from 'path'

const server = new Koa()
server.port = process.env.PORT || 3000
server.name = process.env.NAME = require(resolve('package.json'))['name']

server.use(require('koa-compress')())
server.use(require('./modules/response-time')())
server.use(require('./modules/favicon')(resolve('public/favicon.ico')))

if ('production' !== server.env) {
  server.use(require('koa-logger')())

  const webpackConfig = require('config/webpack.babel')
  const compiler = require('webpack')(webpackConfig)
  const {publicPath} = webpackConfig.output
  const koaWebpack = require('./modules/webpack')

  server.use(koaWebpack.webpackDevMiddleware(compiler, publicPath))
  server.use(koaWebpack.webpackHotMiddleware(compiler))
}

server.use(require('./routes'))
if ('production' === server.env) {
  // ISSUE: What if we use Nginx as static file server?
  server.use(require('koa-static')(resolve('public'), {gzip: true}))
}

/* eslint-disable no-console */
server.listen(server.port, function() {
  console.info(`💻 本地地址：http://localhost:${server.port}`)
})
