/* eslint-disable no-console */
import Koa from 'koa';
import pkg from '../package.json';
import {resolve} from 'path';

export const root = resolve(__dirname, '..');
export const env = process.env.NODE_ENV || 'development';

const server = new Koa();
server.port = process.env.PORT || 3000;
server.name = process.env.NAME = pkg.name;

server.use(require('./middlewares/response-time')());

if ('production' != env) server.use(require('koa-logger')());

server.use(require('koa-favicon')(resolve(root, 'public', 'favicon.ico')));

server.use(require('./routes').routes());

export default server.listen(server.port, function() {
  console.info(`[${server.name}] => http://localhost:${server.port}`);
});
