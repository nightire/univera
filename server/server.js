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
  const koaWebpack = require('./services/webpack');

  server.use(koaWebpack.webpackDevMiddleware(compiler, publicPath));
  server.use(koaWebpack.webpackHotMiddleware(compiler));

  const watcher = require('chokidar').watch(require('path').resolve());

  watcher.on('ready', function() {
    watcher.on('all', function() {
      console.info(`💦 从服务端清除 /server/ 模块缓存`);
      Object.keys(require.cache).forEach(id => {
        /[\/\\]server[\/\\]/.test(id) && delete require.cache[id];
      });
    });
  });

  compiler.plugin('done', function() {
    console.info(`💦 从客户端清除 /client/ 模块缓存`);
    Object.keys(require.cache).forEach(id => {
        /[\/\\]client[\/\\]/.test(id) && delete require.cache[id];
    });
  });

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
