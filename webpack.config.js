var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var merge = require('webpack-merge');
var Clean = require('clean-webpack-plugin');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

var pkg = require('./package.json');

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

process.env.BABEL_ENV = TARGET;

var common = {
  entry: PATHS.app,
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: PATHS.app
      }
    ]
  },
  postcss: [
    require('autoprefixer')({ browsers: ['last 2 versions'] }),
    require('postcss-color-rebeccapurple')
  ],
  plugins: [
    new HtmlwebpackPlugin({
      title: 'Netwalk game',
      template: path.join(PATHS.app, 'template.html'),
      inject: 'body'
    })
  ]
};

if (TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    module: {
      loaders: [
        {
          test: /\.scss$/,
          loader: 'style!css!postcss-loader!sass',
          include: PATHS.app
        }
      ]
    },
    devtool: 'source-map',
    plugins: [
      new webpack.DefinePlugin({
        __DEV__: true
      })
    ]
  });
}

if(TARGET === 'build' || TARGET === 'stats' || TARGET === 'deploy') {
  module.exports = merge(common, {
    entry: {
      app: PATHS.app,
      vendor: Object.keys(pkg.dependencies)
    },
    output: {
      path: PATHS.build,
      filename: '[name].[chunkhash].js?'
    },
    module: {
      loaders: [
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract('style', 'css!postcss!sass'),
          include: PATHS.app
        }
      ]
    },
    devtool: 'source-map',
    plugins: [
      new webpack.DefinePlugin({
        // This affects react lib size
        'process.env.NODE_ENV': JSON.stringify('production'),
        __DEV__: false
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new webpack.optimize.CommonsChunkPlugin(
        'vendor',
        '[name].[chunkhash].js'
      ),
      new Clean(['build']),
      new ExtractTextPlugin('styles.[chunkhash].css')
    ]
  });
}
