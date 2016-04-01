/* eslint-disable no-console */
import Koa from 'koa';
import path from 'path';
import pkg from '../package.json';

export const root = path.join(__dirname, '..');
export const env = process.env.NODE_ENV || 'development';

const server = module.exports = new Koa();
server.port = process.env.PORT || 3000;
server.name = process.env.NAME = pkg.name;

if ('production' != env) server.use(require('koa-logger')());

server.use(require('./middlewares/response-time')());

server.use(require('koa-compress')());

server.use(require('koa-favicon')(path.join(root, 'public', 'favicon.ico')));

server.use(require('./routes'));

server.listen(server.port, function() {
  console.info(`[${server.name}] => http://localhost:${server.port}`);
});
