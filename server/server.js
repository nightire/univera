/* eslint-disable no-console */
import Koa from 'koa';
import {resolve} from 'path';
import router from './routes';

export const root = resolve(__dirname, '..');
export const env = process.env.NODE_ENV || 'development';

const server = new Koa();
server.port = process.env.PORT || 3000;
server.name = process.env.npm_package_name || 'univera';

if ('production' != env) server.use(require('koa-logger')());

server.use(require('./middlewares/response-time')());

server.use(require('koa-favicon')(resolve(root, 'public', 'favicon.ico')));

server.use(router.routes()).use(router.allowedMethods());

export default server.listen(server.port, function() {
  console.info(`[${server.name}] => http://localhost:${server.port}`);
});
