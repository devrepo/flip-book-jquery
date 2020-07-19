var webpack = require('webpack');
var path = require('path');

module.exports = function(env) {
  var debug = false;
  if(env) {
    debug = !!env.debug;
  }

  return {
    context: __dirname,
    devtool: debug ? 'inline-sourcemap' : '',
    entry: ['./src/3dflipbook.js'],
    output: {
      path: __dirname,
      filename: './src/3dflipbook.min.js'
    },
    module: {
      loaders: [
        {
          test: /\.html$/,
          loader: 'raw-loader'
        },
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
          query: {
            presets: [['es2015', {'loose': true}], 'stage-0'],
            plugins: ['transform-class-properties']
          }
        }
      ]
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    ],
  };
}
