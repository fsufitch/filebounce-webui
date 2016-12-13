const webpack = require('webpack');
const webpackCommon = require('./webpack.common');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs

module.exports = webpackMerge(webpackCommon, {
  devtool: 'none',

  devServer: {
    port: 9999,
    host: 'localhost',
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
  ]
})
