/* eslint-disable no-console */
import Koa from 'koa';

const server = new Koa();
server.port = process.env.PORT || 3000;
server.name = process.env.NAME = require('../package.json').name;

if ('production' != server.env) {
  server.use(require('koa-logger')());

  const webpackConfig = require('../config/webpack.babel');
  const compiler = require('webpack')(webpackConfig);
  const {publicPath} = webpackConfig.output;
  server.use(require('./services/webpack')(compiler, publicPath));

  require('dns').lookup(
    require('os').hostname(), (err, address) => {server.address = address}
  );

  require('localtunnel')(
    server.port, {subdomain: server.name}, (error, tunnel) => {
      error && console.error(error);

      console.info(`💻 本地地址：http://localhost:${server.port}`);
      console.info(`🚧 内网地址：http://${server.address}:${server.port}`);
      console.info(`🌏 外网地址：${tunnel.url}`);
    }
  );
}

server.use(require('./services/response-time')());

server.use(require('koa-compress')());

server.use(require('koa-static')('public', {maxage: 604800000, defer: true}));

server.use(require('./services/favicon')('public/favicon.ico'));

server.use(require('./routes'));

server.listen(server.port);
