const webpack = require('webpack');
const path = require('path');

module.exports = {
    // sourcemaps inline
    devtool: 'eval',

    entry: ['index.tsx'],

    output: {
        filename: 'app.js',
        publicPath: 'dist',
        path: path.resolve('dist')
    },

    devServer: {
        port:3000,
        historyApiFallback: true,
        inline: true
    },

    resolve: {
        // look for modules in in .ts(x) first, then .js
        extensions: ['.ts', '.tsx', '.js'],

        // add 'src' to the modules so that when you import files you can do so with 'src'
        // as the relative route
        modules: ['src', 'node_modules']
    },

    module: {
        // .ts(x) files should first pass through the typescript loader first and then through babel
        loaders: [
            {
                test: /\.tsx?$/,
                loaders: ['babel-loader', 'ts-loader'],
                include: path.resolve('src')
            }
        ]
    }
}