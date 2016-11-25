const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      _: 'underscore',
      Backbone: 'backbone',
    }),
  ],
  devtool: 'source-map',
  entry: ['babel-polyfill', './js/app.js'],
  output: {
    path: 'dist/js',
    filename: '[name].js',
  },
  watch: true,
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015'],
          plugins: ['transform-object-rest-spread'],
        },
      },
      {
        test: /[\/\\]node_modules[\/\\]some-module[\/\\]app\.js$/,
        loader: 'imports?jQuery=jquery,$=jquery,this=>window',
      },
    ],
  },
};
