var webpack = require('webpack');
var minimize = process.argv.indexOf('--optimize-minimize') === -1 ? false : true;
var plugins = minimize ? [new webpack.optimize.UglifyJsPlugin({
  minimize: true,
  compress: {
    drop_console: true
  }
})] : [];

module.exports = {
  entry: './src/amv-trafficsoft-rest-js.js',
  output: {
    path:  __dirname + '/dist',
    filename: minimize ? 'amv-trafficsoft-rest-js.min.js' : 'amv-trafficsoft-rest-js.js',
    libraryTarget: 'umd',
    library: 'amvTrafficsoftRestJs'
  },
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader'
    }]
  },
  plugins: plugins
};
