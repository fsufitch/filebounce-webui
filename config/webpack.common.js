const path = require('path');
const webpack = require('webpack');
const helpers = require('./helpers');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;

/*
 * Webpack Constants
 */
const HMR = helpers.hasProcessFlag('hot');
const METADATA = {
  title: 'Angular2 Webpack Starter by @gdi2290 from @AngularClass',
  baseUrl: '/',
  isDevServer: helpers.isWebpackDevServer()
};

module.exports = {
  node: {
    fs: 'empty',
    tls: 'empty',
  },

  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'main': './src/main.ts',
  },

  output: {
      //publicPath: 'http://localhost:8080/',
      path: helpers.root('build'),
      filename: '[name].bundle.js'
  },

  resolve: {
    extensions: ['.ts', '.js', '.json', '.yaml', '.scss', '.css', '.html'],
    modules: [helpers.root('src'), helpers.root('node_modules')],
    alias: {
      'bootstrap-sass-assets': helpers.root('node_modules/bootstrap-sass/assets'),
    }
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader?configFileName=' + path.join('.', 'src', 'tsconfig.json'),
      },
      { test: /\.json$/, loader: 'json-loader'},
      { test: /\.s?css$/, loader: 'css-to-string-loader!css-loader!sass-loader' },
      { test: /\.html?$/, loader: 'html-loader' },
      { test: /\.(ttf|eot|woff2?|png|jpe?g|svg)$/, loader: 'url-loader?limit=10000' },
      { test: /\.(txt|proto)$/, loader: 'raw-loader'}
    ],
  },

  plugins: [
    new CommonsChunkPlugin({
      name: ['polyfills', 'vendor'].reverse()
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new CheckerPlugin(),

  ],
};
