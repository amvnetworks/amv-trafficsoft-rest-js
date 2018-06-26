var webpack = require('webpack');

var isDev = process.argv.indexOf('--optimize-minimize') === -1 ? false : true;
var minimize = !isDev;

var fileExtension = minimize ? '.min.js' : '.js';
var fullFileName = 'amv-trafficsoft-rest-js' + fileExtension;

var plugins = [];

module.exports = {
  mode: 'production',
  entry: './src/amv-trafficsoft-rest-js.js',
  output: {
    path: __dirname + '/dist',
    filename: fullFileName,
    libraryTarget: 'umd',
    globalObject: 'this',
    library: 'amvTrafficsoftRestJs'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',  
        }
      }
    ]
  },
  optimization: {
    minimize: minimize
  },
  plugins: plugins
};
