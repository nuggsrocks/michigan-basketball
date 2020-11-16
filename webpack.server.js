const nodeExternals = require('webpack-node-externals')

module.exports = {
    mode: 'development',
    watch: true,
    entry: './src/server/index.js',
    output: {
        path: __dirname,
        publicPath: '/',
        filename: 'server.js'
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
    }
}