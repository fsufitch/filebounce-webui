const webpack = require('webpack');
const helpers = require('./helpers');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;


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
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader?tsconfig=./src/tsconfig.json'
      },
      { test: /\.s?css$/, loader: 'css-to-string!css!sass' },
      { test: /\.html?$/, loader: 'html' },
      { test: /\.(ttf|eot|woff2?|png|jpe?g|svg)$/, loader: "url?limit=10000" }
    ],
  },

  plugins: [
    new CommonsChunkPlugin({
      name: ['polyfills', 'vendor'].reverse()
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new ForkCheckerPlugin(),

  ],
};
