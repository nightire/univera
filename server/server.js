import Koa from 'koa';
import path from 'path';
import responseTime from './services/response-time';
import compress from 'koa-compress';
import favicon from 'koa-favicon';
import serveStatic from 'koa-static';
import routes from './routes';

export const root = path.join(__dirname, '..');

const server = new Koa();
server.port = process.env.PORT || 3000;
server.name = process.env.NAME = require('../package.json').name;

if ('production' != server.env) {
  server.use(require('koa-logger')());

  const webpackConfig = require('../config/webpack.babel.js');
  const compiler = require('webpack')(webpackConfig);
  const {publicPath} = webpackConfig.output;
  server.use(require('./services/webpack')(compiler, publicPath));
} else {
  server.use(serveStatic(path.join(root, 'public')));
}

server.use(responseTime());

server.use(compress());

server.use(favicon(path.join(root, 'public', 'favicon.ico')));

server.use(routes);

server.listen(server.port, () => {
  console.info(`[${server.name}] ☞ http://localhost:${server.port}`); // eslint-disable-line
});

export default server;
