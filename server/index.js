require('babel-register')({
  plugins: [
    'transform-es2015-block-scoping',
    'transform-es2015-parameters',
    'transform-async-to-generator'
  ]
});
require('./server');
