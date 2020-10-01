const nodeExternals = require('webpack-node-externals');

module.exports = {
	mode: 'development',
	entry: {server: './server/js/index.js'},
	output: {
		path: __dirname + '/public',
		publicPath: '/',
		filename: '[name].js'
	},
	target: 'node',
	node: {
		__dirname: false,
		__filename: false
	},
	externals: [nodeExternals()],
	module: {
		rules: [
		{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		}
		]
	},
	watch: true
}