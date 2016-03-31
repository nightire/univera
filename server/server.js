/* eslint-disable no-console */
import Koa from 'koa';
import {resolve} from 'path';
import pkg from '../package.json';

export const root = resolve(__dirname, '..');
export const env = process.env.NODE_ENV || 'development';

const server = module.exports = new Koa();
server.port = process.env.PORT || 3000;
server.name = process.env.NAME = pkg.name;

server.use(require('./middlewares/response-time')());

server.use(require('koa-compress')());

if ('production' != env) server.use(require('koa-logger')());

server.use(require('koa-favicon')(resolve(root, 'public', 'favicon.ico')));

server.use(require('./routes').routes());

server.listen(server.port, function() {
  console.info(`[${server.name}] => http://localhost:${server.port}`);
});
