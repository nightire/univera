import createLogger from 'redux-logger';

export default 'production' === process.env.NODE_ENV ? [
] : [
  createLogger({level: 'info', duration: true})
];
