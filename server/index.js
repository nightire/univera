require('babel-register');
require('babel-polyfill');
global.config = require('../config');
require('./server');
