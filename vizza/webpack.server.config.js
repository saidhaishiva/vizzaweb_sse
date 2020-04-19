const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        // This is our Express server for Dynamic universal
        server: './server.ts',
    },
    target: 'node',
    resolve: { extensions: ['.ts', '.js'] },
    // Make sure we include all node_modules etc
    externals: [/(node_modules|main..*.js)/,],
    output: {
        // Puts the output at the root of the dist folder
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            { test: /.ts$/,exclude:[/node_modules/], loader: 'ts-loader' }
        ]
    },
    plugins: [
        // Temporary Fix for issue: https://github.com/angular/angular/issues/11580
        // for "WARNING Critical dependency: the request of a dependency is an expression"
        new webpack.ContextReplacementPlugin(
            /(.+)?angular(\\|\/)core(.+)?/,
            path.join(__dirname, 'src'), // location of your src
            {} // a map of your routes
        ),
        new webpack.ContextReplacementPlugin(
            /(.+)?express(\\|\/)(.+)?/,
            path.join(__dirname, 'src'),
            {}
        )
    ]
}
