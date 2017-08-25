 const path = require('path');
 const webpack = require('webpack');

 module.exports = {
  devServer: {
    port: '8080',
    contentBase: './',
    inline: true,
    host: '0.0.0.0',
    disableHostCheck: true,
  },
   entry: {
     app: './src',
   },
   output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/static/',
    filename: '[name].js',
  },
   module: {
     rules: [
       {
         test: /\.js/,
         exclude: [/node_modules/],
         use: {
           loader: 'babel-loader',
         },
       },
     ],
   },
 };
