const {merge} = require('webpack-merge');
const productionConfig = require('./webpack.prod');
const webpack = require('webpack');


module.exports = merge(productionConfig, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.HOST': JSON.stringify('localhost'),
    }),
  ],
});
