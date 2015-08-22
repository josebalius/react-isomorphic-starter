var path    = require('path');
var webpack = require('webpack');

module.exports = {
  entry:  [
    './src/client'
  ],
  output: {
    path: path.join(__dirname, '..', 'dist', 'client', 'public'),
    filename: 'bundle.js'
  },
  resolve: {
    modulesDirectories: ['node_modules', 'src'],
    extensions:         ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test:    /\.js?$/,
        exclude: /node_modules/,
        loaders: ['babel?optional[]=runtime&stage=0']
      }
    ]
  },
  plugins: [
    new webpack.IgnorePlugin(new RegExp("^(node-mocks-http|RootView)$")),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],
  node: {
    fs: "empty"
  }
};
