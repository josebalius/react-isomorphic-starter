var path = require('path');
process.env.NODE_PATH = path.join(__dirname, '..');
require('module').Module._initPaths();
require('babel/polyfill');
require('server/App');
