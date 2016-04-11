require('babel-register');
require('babel-polyfill');
require('css-modules-require-hook/preset');

global.document = require('jsdom').jsdom();
global.window = document.defaultView;
global.navigator = window.navigator;
