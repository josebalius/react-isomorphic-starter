var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  publicPath: 'http://localhost:8080/dist/',
  hot: true,
  historyApiFallback: true,
  quiet: true
}).listen(8080, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Development server running on localhost:8080');
});
