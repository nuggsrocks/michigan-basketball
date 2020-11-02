const {merge} = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

module.exports = merge(commonConfig, {
	mode: 'development',
	watch: true,
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.css$/,
				loader: ['style-loader', 'css-loader']
			},
			{
				test: /\.scss$/,
				loader: ['style-loader', 'css-loader', 'sass-loader']
			},
		]
	}
});