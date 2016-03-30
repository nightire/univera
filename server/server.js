/* eslint-disable no-console */
import Koa from 'koa';
import {resolve} from 'path';

export const root = resolve(__dirname, '..');
export const env = process.env.NODE_ENV || 'development';

const server = new Koa();
server.port = process.env.PORT || 3000;
server.name = process.env.npm_package_name || 'univera';

if ('production' != env) server.use(require('koa-logger')());

server.use(require('./middlewares/response-time')());

server.use(require('koa-favicon')(resolve(root, 'public', 'favicon.ico')));

const ssrOptions = {title: server.name};
server.use(require('./middlewares/server-side-rendering')(ssrOptions));

export default server.listen(server.port, function() {
  console.info(`[${server.name}] => http://localhost:${server.port}`);
});
