/* eslint-disable no-console */
const Koa = require('koa');
const server = new Koa();
const path = require('path');

server.port = process.env.PORT || 3000;
server.name = process.env.npm_package_name || 'univera';

if (process.env.NODE_ENV === 'development') {
  server.use(require('koa-logger')());
}

server.use(require('./middlewares/response-time')());

const favicon = path.join(__dirname, '..', 'public', 'favicon.ico');
server.use(require('koa-favicon')(favicon));

const ssrOptions = {title: server.name};
server.use(require('./middlewares/server-side-rendering')(ssrOptions));

exports.app = server.listen(server.port, function() {
  console.info(`[${server.name}] => http://localhost:${server.port}`);
});
