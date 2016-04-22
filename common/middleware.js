import loggerMiddleware from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';

const promiseTypeSuffixes = ['读取', '成功', '失败'];

export default (('production' === process.env.NODE_ENV) || global.GLOBAL) ? [
  promiseMiddleware({promiseTypeSuffixes}),
] : [
  promiseMiddleware({promiseTypeSuffixes}),
  loggerMiddleware({level: 'info', duration: true})
];
