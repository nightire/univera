import Koa from 'koa';
import path from 'path';
import logger from 'koa-logger';
import responseTime from './middlewares/response-time';
import compress from 'koa-compress';
import favicon from 'koa-favicon';
import routes from './routes';

export const root = path.join(__dirname, '..');
export const env = process.env.NODE_ENV || 'development';

const server = new Koa();
server.port = process.env.PORT || 3000;
server.name = process.env.NAME = process.env.npm_package_name;

if ('production' !== env) server.use(logger());

server.use(responseTime());

server.use(compress());

server.use(favicon(path.join(root, 'public', 'favicon.ico')));

server.use(routes);

server.listen(server.port, function() {
  console.info(`[${server.name}] => http://localhost:${server.port}`);  // eslint-disable-line
});

export default server;
